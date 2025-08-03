import {
	InvalidSpotTemplateDescriptionValueObjectError,
	SpotTemplateDescriptionValueObject,
} from "@/domain/report"; 

describe("SpotTemplateDescriptionValueObject", () => {
	it("should return InvalidSpotTemplateDescriptionValueObjectError for an invalid spot template description (null)", () => {
		const invalidSpotTemplateDescription = null;

		expect(() => SpotTemplateDescriptionValueObject.create(invalidSpotTemplateDescription)).toThrow(InvalidSpotTemplateDescriptionValueObjectError);
	});

	it("should return InvalidSpotTemplateDescriptionValueObjectError for an invalid spot template description (number)", () => {
		const invalidSpotTemplateDescription = 123;

		expect(() => SpotTemplateDescriptionValueObject.create(invalidSpotTemplateDescription as unknown as string)).toThrow(InvalidSpotTemplateDescriptionValueObjectError);
	});

	it("should return InvalidSpotTemplateDescriptionValueObjectError for an invalid spot template description (empty string)", () => {
		const invalidSpotTemplateDescription = "";

		expect(() => SpotTemplateDescriptionValueObject.create(invalidSpotTemplateDescription)).toThrow(InvalidSpotTemplateDescriptionValueObjectError);
	});

	it("should return InvalidSpotTemplateDescriptionValueObjectError for an invalid spot template description (string with length > 80)", () => {
		const invalidSpotTemplateDescription = "InvalidSpotTemplateDescriptionWithLengthMoreThan50Characaaaaaaaaaaaaaaaaaaaaaters";

		expect(() => SpotTemplateDescriptionValueObject.create(invalidSpotTemplateDescription)).toThrow(InvalidSpotTemplateDescriptionValueObjectError);
	});

	it("should create a SpotTemplateDescriptionValueObject instance with a valid spot template description", () => {
		const validSpotTemplateDescription = "Basic Spot Template Description";

		const sut = SpotTemplateDescriptionValueObject.create(validSpotTemplateDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotTemplateDescription);
		expect(sut).toBeInstanceOf(SpotTemplateDescriptionValueObject);
	});
});