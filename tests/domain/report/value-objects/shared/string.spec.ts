import { InvalidStringValueObjectError, StringValueObject } from "@/domain/shared";

describe("StringValueObject", () => {
	it("should return InvalidStringValueObjectError for an invalid string (null)", () => {
		const invalidString = null;

		expect(() => StringValueObject.create(invalidString)).toThrow(InvalidStringValueObjectError);
	});

	it("should return InvalidStringValueObjectError for an invalid string (number)", () => {
		const invalidString = 42;

		expect(() => StringValueObject.create(invalidString as unknown as string)).toThrow(InvalidStringValueObjectError);
	});

	it("should return InvalidStringValueObjectError for an invalid string (empty string)", () => {
		const invalidString = "";

		expect(() => StringValueObject.create(invalidString)).toThrow(InvalidStringValueObjectError);
	});

	it("should create a StringValueObject instance with a valid string", () => {
		const validString = "validString";

		const sut = StringValueObject.create(validString);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validString);
		expect(sut).toBeInstanceOf(StringValueObject);
	});
});
