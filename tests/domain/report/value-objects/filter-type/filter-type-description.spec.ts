import { FilterValueTypeDescriptionValueObject } from "@/domain/report"; 

describe("FilterValueTypeDescriptionValueObject", () => {
	it("should return InvalidFilterValueTypeDescriptionValueObjectError for an invalid filter type description (null)", () => {
		const invalidFilterTypeDescription = null;

		expect(() => FilterValueTypeDescriptionValueObject.create(invalidFilterTypeDescription)).toThrow();
	});

	it("should return InvalidFilterValueTypeDescriptionValueObjectError for an invalid filter type description (number)", () => {
		const invalidFilterTypeDescription = 123;

		expect(() => FilterValueTypeDescriptionValueObject.create(invalidFilterTypeDescription as unknown as string)).toThrow();
	});

	it("should return InvalidFilterValueTypeDescriptionValueObjectError for an invalid filter type description (empty string)", () => {
		const invalidFilterTypeDescription = "";

		expect(() => FilterValueTypeDescriptionValueObject.create(invalidFilterTypeDescription)).toThrow();
	});

	it("should return InvalidFilterValueTypeDescriptionValueObjectError for an invalid filter type description (string with length > 50)", () => {
		const invalidFilterTypeDescription = "InvalidFilterTypeDescriptionWithLengthMoreThan50Characters";

		expect(() => FilterValueTypeDescriptionValueObject.create(invalidFilterTypeDescription)).toThrow();
	});

	it("should create a FilterValueTypeDescriptionValueObject instance with a valid filter type description", () => {
		const validFilterTypeDescription = "Basic Filter Type Description";

		const sut = FilterValueTypeDescriptionValueObject.create(validFilterTypeDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validFilterTypeDescription);
		expect(sut).toBeInstanceOf(FilterValueTypeDescriptionValueObject);
	});
});