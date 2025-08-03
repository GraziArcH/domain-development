import {
	InvalidSpotTypeDescriptionValueObjectError,
	SpotTypeDescriptionValueObject,
} from "@/domain/report"; 

describe("SpotTypeDescriptionValueObject", () => {
	it("should return InvalidSpotTypeDescriptionValueObjectError for an invalid spot type description (null)", () => {
		const invalidSpotTypeDescription = null;

		expect(() => SpotTypeDescriptionValueObject.create(invalidSpotTypeDescription)).toThrow(InvalidSpotTypeDescriptionValueObjectError);
	});

	it("should return InvalidSpotTypeDescriptionValueObjectError for an invalid spot type description (number)", () => {
		const invalidSpotTypeDescription = 123;

		expect(() => SpotTypeDescriptionValueObject.create(invalidSpotTypeDescription as unknown as string)).toThrow(InvalidSpotTypeDescriptionValueObjectError);
	});

	it("should return InvalidSpotTypeDescriptionValueObjectError for an invalid spot type description (empty string)", () => {
		const invalidSpotTypeDescription = "";

		expect(() => SpotTypeDescriptionValueObject.create(invalidSpotTypeDescription)).toThrow(InvalidSpotTypeDescriptionValueObjectError);
	});

	it("should return InvalidSpotTypeDescriptionValueObjectError for an invalid spot type description (string with length > 50)", () => {
		const invalidSpotTypeDescription = "InvalidSpotTypeDescriptionWithLengthMoreThan50Characters";

		expect(() => SpotTypeDescriptionValueObject.create(invalidSpotTypeDescription)).toThrow(InvalidSpotTypeDescriptionValueObjectError);
	});

	it("should create a SpotTypeDescriptionValueObject instance with a valid spot type description", () => {
		const validSpotTypeDescription = "Basic Spot Type Description";

		const sut = SpotTypeDescriptionValueObject.create(validSpotTypeDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotTypeDescription);
		expect(sut).toBeInstanceOf(SpotTypeDescriptionValueObject);
	});
});
