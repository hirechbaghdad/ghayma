export const uploadImageRemoteCommand = (application) => {
    const registry = application.registry;
    if (!registry) {
        throw new Error("Registry not found");
    }
    const { registryUrl, imagePrefix, username } = registry;
    const { appName } = application;
    const imageName = `${appName}:latest`;
    const finalURL = registryUrl;
    // Build registry tag in correct format: registry.com/owner/image:tag
    const registryTag = imagePrefix
        ? `${registryUrl ? `${registryUrl}/` : ""}${imagePrefix}/${imageName}`
        : `${registryUrl ? `${registryUrl}/` : ""}${username}/${imageName}`;
    try {
        const command = `
		echo "📦 [Enabled Registry] Uploading image to '${registry.registryType}' | '${registryTag}'" ;
		echo "${registry.password}" | docker login ${finalURL} -u ${registry.username} --password-stdin || { 
			echo "❌ DockerHub Failed" ;
			exit 1;
		}
		echo "✅ Registry Login Success" ;
		docker tag ${imageName} ${registryTag} || { 
			echo "❌ Error tagging image" ;
			exit 1;
		}
		echo "✅ Image Tagged" ;
		docker push ${registryTag} || { 
			echo "❌ Error pushing image" ;
			exit 1;
		}
			echo "✅ Image Pushed" ;
		`;
        return command;
    }
    catch (error) {
        throw error;
    }
};
