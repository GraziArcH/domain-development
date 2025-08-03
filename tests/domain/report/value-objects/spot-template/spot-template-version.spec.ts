import {
	InvalidSpotTemplateVersionValueObjectError,
	SpotTemplateVersionValueObject,
} from "@/domain/report"; 

describe("SpotTemplateVersionValueObject", () => {
	it("should return InvalidSpotTemplateVersionValueObjectError for an invalid spot template version (null)", () => {
		const invalidSpotTemplateVersion = null;

		expect(() => SpotTemplateVersionValueObject.create(invalidSpotTemplateVersion)).toThrow(InvalidSpotTemplateVersionValueObjectError);
	});

	it("should return InvalidSpotTemplateVersionValueObjectError for an invalid spot template version (number)", () => {
		const invalidSpotTemplateVersion = 123;

		expect(() => SpotTemplateVersionValueObject.create(invalidSpotTemplateVersion as unknown as string)).toThrow(InvalidSpotTemplateVersionValueObjectError);
	});

	it("should return InvalidSpotTemplateVersionValueObjectError for an invalid spot template version (string with length > 4)", () => {
		const invalidSpotTemplateVersion = "InvalidSpotTemplateVersionWithLengthMoreThan4Characters";

		expect(() => SpotTemplateVersionValueObject.create(invalidSpotTemplateVersion)).toThrow(InvalidSpotTemplateVersionValueObjectError);
	});

	it("should create a SpotTemplateVersionValueObject instance with a valid spot template version", () => {
		const validSpotTemplateVersion = "1.0";

		const sut = SpotTemplateVersionValueObject.create(validSpotTemplateVersion);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotTemplateVersion);
		expect(sut).toBeInstanceOf(SpotTemplateVersionValueObject);
	});
});
