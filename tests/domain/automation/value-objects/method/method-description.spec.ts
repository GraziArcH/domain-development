import { InvalidMethodDescriptionValueObjectError, MethodDescriptionValueObject } from "@/domain/automation";

describe("MethodDescriptionValueObject", () => {
	it("should return InvalidMethodDescriptionValueObjectError for an invalid method description (null)", () => {
		const invalidMethodDescription = null;

		expect(() => MethodDescriptionValueObject.create(invalidMethodDescription)).toThrow(InvalidMethodDescriptionValueObjectError);
	});

	it("should return InvalidMethodDescriptionValueObjectError for an invalid method description (number)", () => {
		const invalidMethodDescription = 123;

		expect(() => MethodDescriptionValueObject.create(invalidMethodDescription as unknown as string)).toThrow(InvalidMethodDescriptionValueObjectError);
	});

	it("should return InvalidMethodDescriptionValueObjectError for an invalid method description (empty string)", () => {
		const invalidMethodDescription = "";

		expect(() => MethodDescriptionValueObject.create(invalidMethodDescription)).toThrow(InvalidMethodDescriptionValueObjectError);
	});

	it("should return InvalidMethodDescriptionValueObjectError for an invalid method description (string with length > 50)", () => {
		const invalidMethodDescription = "InvalidMethodDescriptionWithLengthMoreThan50Characters";

		expect(() => MethodDescriptionValueObject.create(invalidMethodDescription)).toThrow(InvalidMethodDescriptionValueObjectError);
	});

	it("should create a MethodDescriptionValueObject instance with a valid method description", () => {
		const validMethodDescription = "Basic Method Description";

		const sut = MethodDescriptionValueObject.create(validMethodDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validMethodDescription);
		expect(sut).toBeInstanceOf(MethodDescriptionValueObject);
	});
});
