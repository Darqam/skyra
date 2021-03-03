import { execFile } from 'child_process';
import { gray, green, red } from 'colorette';
import { mkdir, readdir, rm, writeFile } from 'fs/promises';
import { dirname, join, sep } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const protoDirectory = join(rootDir, 'assets', 'protos');
const generatedDirectory = join(rootDir, 'src', 'lib', 'grpc', 'generated');

async function getSourceProtoFiles() {
	const protoFiles = await readdir(protoDirectory);
	return protoFiles.filter((file) => file.endsWith('.proto'));
}

/**
 * @param {string} directory
 * @param {readonly string[]} files
 */
function printFiles(directory, files) {
	if (files.length === 0) return;

	const mid = files.slice(0, -1);
	const last = files[files.length - 1];

	console.log(gray(`Processed ${green(files.length.toString())} file${files.length === 1 ? '' : 's'}!`));
	for (const file of mid) console.log(gray(`├─ ${directory}${sep}${green(file)}`));
	console.log(gray(`└─ ${directory}${sep}${green(last)}`));
}

async function prepareGeneratedDirectory() {
	await mkdir(generatedDirectory, { recursive: true });
}

function isWindows() {
	return process.platform === 'win32';
}

async function addIndex() {
	const files = await readdir(generatedDirectory);
	const filtered = files.filter((file) => file.endsWith('.js'));

	const indexFile = join(generatedDirectory, 'index.ts');
	const content = filtered.map((file) => `export * from './${file.slice(0, -3)}';\n`).join('');
	await writeFile(indexFile, content, 'utf-8');

	printFiles(generatedDirectory, filtered);
}

async function generate() {
	const files = await getSourceProtoFiles();
	printFiles(protoDirectory, files);

	await prepareGeneratedDirectory();

	const execFileAsync = promisify(execFile);
	const protoc = join(rootDir, 'node_modules', '.bin', isWindows() ? 'grpc_tools_node_protoc.cmd' : 'grpc_tools_node_protoc');
	await execFileAsync(protoc, [
		`--proto_path=${protoDirectory}`,
		`--js_out=import_style=commonjs,binary:${generatedDirectory}`,
		`--grpc_out=grpc_js,import_style=commonjs:${generatedDirectory}`,
		...files
	]);

	const protoGenTypeScript = join(rootDir, 'node_modules', '.bin', isWindows() ? 'protoc-gen-ts.cmd' : 'protoc-gen-ts');
	await execFileAsync(protoc, [
		`--plugin=protoc-gen-ts=${protoGenTypeScript}`,
		`--proto_path=${protoDirectory}`,
		`--ts_out=grpc_js:${generatedDirectory}`,
		...files
	]);

	await addIndex();

	// Print status
	console.log(gray(`Successfully ${green('generated')} gRPC files!`));
}

async function clean() {
	await rm(generatedDirectory, { recursive: true });

	// Print status
	console.log(gray(`Successfully ${red('deleted')} gRPC files!`));
}

try {
	if (process.argv.length <= 2 || process.argv[2] === 'generate') {
		await generate();
	} else if (process.argv[2] === 'clean') {
		await clean();
	} else if (process.argv[2] === 'reload') {
		await clean();
		await generate();
	} else {
		console.error(`Unknown option ${process.argv[2]}`);
		process.exit(2);
	}
} catch (error) {
	console.error(error.stack);
	process.exit(1);
}
