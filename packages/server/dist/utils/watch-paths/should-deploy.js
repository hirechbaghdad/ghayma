import micromatch from "micromatch";
export const shouldDeploy = (watchPaths, modifiedFiles) => {
    if (!watchPaths || watchPaths?.length === 0)
        return true;
    return micromatch.some(modifiedFiles, watchPaths);
};
