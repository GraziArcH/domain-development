import {
	InvalidSpotTypeNameValueObjectError,
	SpotTypeNameValueObject,
} from "@/domain/report"; 

describe("SpotTypeNameValueObject", () => {
	it("should return InvalidSpotTypeNameValueObjectError for an invalid spot type name (null)", () => {
		const invalidSpotTypeName = null;

		expect(() => SpotTypeNameValueObject.create(invalidSpotTypeName)).toThrow(InvalidSpotTypeNameValueObjectError);
	});

	it("should return InvalidSpotTypeNameValueObjectError for an invalid spot type name (number)", () => {
		const invalidSpotTypeName = 123;

		expect(() => SpotTypeNameValueObject.create(invalidSpotTypeName as unknown as string)).toThrow(InvalidSpotTypeNameValueObjectError);
	});

	it("should return InvalidSpotTypeNameValueObjectError for an invalid spot type name (empty string)", () => {
		const invalidSpotTypeName = "";

		expect(() => SpotTypeNameValueObject.create(invalidSpotTypeName)).toThrow(InvalidSpotTypeNameValueObjectError);
	});

	it("should return InvalidSpotTypeNameValueObjectError for an invalid spot type name (string with length > 30)", () => {
		const invalidSpotTypeName = "InvalidSpotTypeNameWithLengthMoreThan30Characters";

		expect(() => SpotTypeNameValueObject.create(invalidSpotTypeName)).toThrow(InvalidSpotTypeNameValueObjectError);
	});

	it("should create a SpotTypeNameValueObject instance with a valid spot type name", () => {
		const validSpotTypeName = "BasicSpotTypeName";

		const sut = SpotTypeNameValueObject.create(validSpotTypeName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSpotTypeName);
		expect(sut).toBeInstanceOf(SpotTypeNameValueObject);
	});
});