import { InvalidCreatedByValueObjectError, CreatedByValueObject } from "@/domain/report"; 

describe("CreatedByValueObject", () => {
	it("should return InvalidCreatedByValueObjectError for an invalid 'created by' value (null)", () => {
		const invalidCreatedBy = null;

		expect(() => CreatedByValueObject.create(invalidCreatedBy)).toThrow(InvalidCreatedByValueObjectError);
	});

	it("should return InvalidCreatedByValueObjectError for an invalid 'created by' value (number)", () => {
		const invalidCreatedBy = 123;

		expect(() => CreatedByValueObject.create(invalidCreatedBy as unknown as string)).toThrow(InvalidCreatedByValueObjectError);
	});

	it("should return InvalidCreatedByValueObjectError for an invalid 'created by' value (string with length > 50)", () => {
		const invalidCreatedBy = "c".repeat(51);

		expect(() => CreatedByValueObject.create(invalidCreatedBy)).toThrow(InvalidCreatedByValueObjectError);
	});

	it("should create a CreatedByValueObject instance with a valid 'created by' value", () => {
		const validCreatedBy = "JohnDoe";

		const sut = CreatedByValueObject.create(validCreatedBy);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validCreatedBy);
		expect(sut).toBeInstanceOf(CreatedByValueObject);
	});
});
