import {
	InvalidSpotTemplateNameValueObjectError,
	SpotTemplateNameValueObject,
} from "@/domain/report"; 

describe("SpotTemplateNameValueObject", () => {
	it("should return InvalidSpotTemplateNameValueObjectError for an invalid spot template name (null)", () => {
		const invalidSpotTemplateName = null;

		expect(() => SpotTemplateNameValueObject.create(invalidSpotTemplateName)).toThrow(InvalidSpotTemplateNameValueObjectError);
	});

	it("should return InvalidSpotTemplateNameValueObjectError for an invalid spot template name (number)", () => {
		const invalidSpotTemplateName = 123;

		expect(() => SpotTemplateNameValueObject.create(invalidSpotTemplateName as unknown as string)).toThrow(InvalidSpotTemplateNameValueObjectError);
	});

	it("should return InvalidSpotTemplateNameValueObjectError for an invalid spot template name (empty string)", () => {
		const invalidSpotTemplateName = "";

		expect(() => SpotTemplateNameValueObject.create(invalidSpotTemplateName)).toThrow(InvalidSpotTemplateNameValueObjectError);
	});

	it("should return InvalidSpotTemplateNameValueObjectError for an invalid spot template name (string with length > 30)", () => {
		const invalidSpotTemplateName = "InvalidSpotTemplateNameWithLengthMoreThan30Characters";

		expect(() => SpotTemplateNameValueObject.create(invalidSpotTemplateName)).toThrow(InvalidSpotTemplateNameValueObjectError);
	});

	it("should create a SpotTemplateNameValueObject instance with a valid spot template name", () => {
		const validSpotTemplateName = "BasicSpotTemplateName";

		const sut = SpotTemplateNameValueObject.create(validSpotTemplateName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotTemplateName);
		expect(sut).toBeInstanceOf(SpotTemplateNameValueObject);
	});
});
