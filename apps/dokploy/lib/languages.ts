/**
 * Sorted list based off of population of the country / speakers of the language.
 */
export const Languages = {
	english: { code: "en", name: "English" },
};

export type Language = keyof typeof Languages;
export type LanguageCode = (typeof Languages)[keyof typeof Languages]["code"];
