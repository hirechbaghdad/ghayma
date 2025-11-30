import { getComposeContainerCommand, getServiceContainerCommand, } from "../backups/utils.js";
export const getPostgresRestoreCommand = (database, databaseUser) => {
    return `docker exec -i $CONTAINER_ID sh -c "pg_restore -U '${databaseUser}' -d ${database} -O --clean --if-exists"`;
};
export const getMariadbRestoreCommand = (database, databaseUser, databasePassword) => {
    return `docker exec -i $CONTAINER_ID sh -c "mariadb -u '${databaseUser}' -p'${databasePassword}' ${database}"`;
};
export const getMysqlRestoreCommand = (database, databasePassword) => {
    return `docker exec -i $CONTAINER_ID sh -c "mysql -u root -p'${databasePassword}' ${database}"`;
};
export const getMongoRestoreCommand = (database, databaseUser, databasePassword) => {
    return `docker exec -i $CONTAINER_ID sh -c "mongorestore --username '${databaseUser}' --password '${databasePassword}' --authenticationDatabase admin --db ${database} --archive"`;
};
export const getComposeSearchCommand = (appName, type, serviceName) => {
    if (type === "database") {
        return getServiceContainerCommand(appName || "");
    }
    return getComposeContainerCommand(appName || "", serviceName || "", type);
};
const generateRestoreCommand = (type, credentials) => {
    const { database, databaseUser, databasePassword } = credentials;
    switch (type) {
        case "postgres":
            return getPostgresRestoreCommand(database, databaseUser || "");
        case "mariadb":
            return getMariadbRestoreCommand(database, databaseUser || "", databasePassword || "");
        case "mysql":
            return getMysqlRestoreCommand(database, databasePassword || "");
        case "mongo":
            return getMongoRestoreCommand(database, databaseUser || "", databasePassword || "");
    }
};
const getMongoSpecificCommand = (rcloneCommand, restoreCommand, backupFile) => {
    const tempDir = "/tmp/dokploy-restore";
    const fileName = backupFile.split("/").pop() || "backup.sql.gz";
    const decompressedName = fileName.replace(".gz", "");
    return `
rm -rf ${tempDir} && \
mkdir -p ${tempDir} && \
${rcloneCommand} ${tempDir} && \
cd ${tempDir} && \
gunzip -f "${fileName}" && \
${restoreCommand} < "${decompressedName}" && \
rm -rf ${tempDir}
	`;
};
export const getRestoreCommand = ({ appName, type, restoreType, credentials, serviceName, rcloneCommand, backupFile, }) => {
    const containerSearch = getComposeSearchCommand(appName, restoreType, serviceName);
    const restoreCommand = generateRestoreCommand(type, credentials);
    let cmd = `CONTAINER_ID=$(${containerSearch})`;
    if (type !== "mongo") {
        cmd += ` && ${rcloneCommand} | ${restoreCommand}`;
    }
    else {
        cmd += ` && ${getMongoSpecificCommand(rcloneCommand, restoreCommand, backupFile || "")}`;
    }
    return cmd;
};
