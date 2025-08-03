import { FilterDescriptionValueObject } from "@/domain/report";

describe("FilterDescriptionValueObject", () => {
	it("should return InvalidFilterDescriptionValueObjectError for an invalid filter description (null)", () => {
		const invalidFilterDescription = null;

		expect(() => FilterDescriptionValueObject.create(invalidFilterDescription)).toThrow();
	});

	it("should return InvalidFilterDescriptionValueObjectError for an invalid filter description (number)", () => {
		const invalidFilterDescription = 123;

		expect(() => FilterDescriptionValueObject.create(invalidFilterDescription as unknown as string)).toThrow();
	});

	it("should return InvalidFilterDescriptionValueObjectError for an invalid filter description (empty string)", () => {
		const invalidFilterDescription = "";

		expect(() => FilterDescriptionValueObject.create(invalidFilterDescription)).toThrow();
	});

	it("should return InvalidFilterDescriptionValueObjectError for an invalid filter description (string with length > 50)", () => {
		const invalidFilterDescription = "InvalidFilterDescriptionWithLengthMoreThan50Characters";

		expect(() => FilterDescriptionValueObject.create(invalidFilterDescription)).toThrow();
	});

	it("should create a FilterDescriptionValueObject instance with a valid filter description", () => {
		const validFilterDescription = "Basic Filter Description";

		const sut = FilterDescriptionValueObject.create(validFilterDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validFilterDescription);
		expect(sut).toBeInstanceOf(FilterDescriptionValueObject);
	});
});