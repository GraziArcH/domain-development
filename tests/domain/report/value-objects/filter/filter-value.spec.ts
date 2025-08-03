import { FilterValueValueObject } from "@/domain/report"; 

describe("FilterValueValueObject", () => {
	it("should return InvalidFilterValueValueObjectError for an invalid filter value (null)", () => {
		const invalidFilterValue = null;

		expect(() => FilterValueValueObject.create(invalidFilterValue)).toThrow();
	});

	it("should return InvalidFilterValueValueObjectError for an invalid filter value (number)", () => {
		const invalidFilterValue = 123;

		expect(() => FilterValueValueObject.create(invalidFilterValue as unknown as string)).toThrow();
	});

	it("should return InvalidFilterValueValueObjectError for an invalid filter value (empty string)", () => {
		const invalidFilterValue = "";

		expect(() => FilterValueValueObject.create(invalidFilterValue)).toThrow();
	});

	it("should return InvalidFilterValueValueObjectError for an invalid filter value (string with length > 50)", () => {
		const invalidFilterValue = "c".repeat(51);

		expect(() => FilterValueValueObject.create(invalidFilterValue)).toThrow();
	});

	it("should create a FilterValueValueObject instance with a valid filter value", () => {
		const validFilterValue = "Basic Filter Value";

		const sut = FilterValueValueObject.create(validFilterValue);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validFilterValue);
		expect(sut).toBeInstanceOf(FilterValueValueObject);
	});
});