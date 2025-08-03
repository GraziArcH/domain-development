import { FilterValueTypeNameValueObject } from "@/domain/report"; 

describe("FilterValueTypeNameValueObject", () => {
	it("should return InvalidFilterValueTypeNameValueObjectError for an invalid filter type name (null)", () => {
		const invalidFilterTypeName = null;

		expect(() => FilterValueTypeNameValueObject.create(invalidFilterTypeName)).toThrow();
	});

	it("should return InvalidFilterValueTypeNameValueObjectError for an invalid filter type name (number)", () => {
		const invalidFilterTypeName = 123;

		expect(() => FilterValueTypeNameValueObject.create(invalidFilterTypeName as unknown as string)).toThrow();
	});

	it("should return InvalidFilterValueTypeNameValueObjectError for an invalid filter type name (empty string)", () => {
		const invalidFilterTypeName = "";

		expect(() => FilterValueTypeNameValueObject.create(invalidFilterTypeName)).toThrow();
	});

	it("should return InvalidFilterValueTypeNameValueObjectError for an invalid filter type name (string with length > 30)", () => {
		const invalidFilterTypeName = "InvalidFilterTypeNameWithLengthMoreThan30Characters";

		expect(() => FilterValueTypeNameValueObject.create(invalidFilterTypeName)).toThrow();
	});

	it("should create a FilterValueTypeNameValueObject instance with a valid filter type name", () => {
		const validFilterTypeName = "Basic Filter Type Name";

		const sut = FilterValueTypeNameValueObject.create(validFilterTypeName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validFilterTypeName);
		expect(sut).toBeInstanceOf(FilterValueTypeNameValueObject);
	});
});