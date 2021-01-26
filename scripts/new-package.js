const { existsSync, rmdirSync, readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { execSync } = require("child_process");

/**
 * Functions
 */
const getPackageName = () => {
  return new Promise((resolve, reject) => {
    const readline = require("readline");
    const slugify = require("slugify");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      "What is the package name? (using capital letter and spaces) ",
      (name) => {
        if (name) {
          resolve({
            name,
            slug: slugify(name.toLowerCase()),
          });
        } else {
          reject("No name given.");
        }

        rl.close();
      }
    );
  });
};

/**
 * Get strapped up and ready!
 */
async function boostrap() {
  try {
    // Get name and slug
    const { name, slug } = await getPackageName();

    // Target
    const targetPath = resolve(__dirname, "..", "packages", slug);

    // Check if the package doesn't exists already
    if (existsSync(targetPath))
      throw new Error(`Package ${name} already exists at ${targetPath}`);

    // Clone repo
    execSync(
      `git clone https://github.com/tmp-dev/syscom-package-starter ${targetPath}`
    );

    // Modify files
    const modifyFiles = ["package.json", "readme.md"];
    modifyFiles
      .map((f) => resolve(targetPath, f))
      .forEach((path) => {
        const rawContent = readFileSync(path, "utf8");
        const content = rawContent
          .replace(/~~package~name~~/g, name)
          .replace(/~~package~slug~~/g, slug);
        writeFileSync(path, content, "utf8");
      });

    // Cleanup .git dir
    const gitDirPath = resolve(targetPath, ".git");
    rmdirSync(gitDirPath, { recursive: true });

    // Done
    console.log(`[success] Created new package ${name} at ${targetPath}`);
  } catch (error) {
    console.error(`[error] ${error}`);
  }
}
boostrap();
