import { prepareEnvironmentVariablesForShell } from "../docker/utils.js";
import { getBuildAppDirectory } from "../filesystem/directory.js";
export const getHerokuCommand = (application) => {
    const { env, appName, cleanCache } = application;
    const buildAppDirectory = getBuildAppDirectory(application);
    const envVariables = prepareEnvironmentVariablesForShell(env, application.environment.project.env, application.environment.env);
    const args = [
        "build",
        appName,
        "--path",
        buildAppDirectory,
        "--builder",
        `heroku/builder:${application.herokuVersion || "24"}`,
    ];
    if (cleanCache) {
        args.push("--clear-cache");
    }
    for (const env of envVariables) {
        args.push("--env", env);
    }
    const command = `pack ${args.join(" ")}`;
    const bashCommand = `
echo "Starting heroku build..." ;
${command} || { 
  echo "❌ Heroku build failed" ;
  exit 1;
}
echo "✅ Heroku build completed." ;
		`;
    return bashCommand;
};
