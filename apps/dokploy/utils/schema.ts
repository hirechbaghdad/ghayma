import { z } from "zod";
import { zfd } from "zod-form-data";

if (typeof window === "undefined") {
	void (async () => {
		const undici = await import("undici");
		globalThis.File = undici.File as any;
		// @ts-ignore
		globalThis.FileList = undici.FileList as any;
	})();
}

export const uploadFileSchema = zfd.formData({
	applicationId: z.string().optional(),
	zip: zfd.file().refine((file) => file.size <= 100 * 1024 * 1024, {
		message: "ZIP file must be 100MB or smaller",
	}),
	dropBuildPath: z.string().optional(),
});

export type UploadFile = z.infer<typeof uploadFileSchema>;
