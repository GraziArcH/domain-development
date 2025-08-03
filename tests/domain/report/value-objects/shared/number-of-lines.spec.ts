import { InvalidNumberOfLinesValueObjectError, NumberOfLinesValueObject } from "@/domain/report"; 

describe("NumberOfLinesValueObject", () => {
	it("should return InvalidNumberOfLinesValueObjectError for an invalid number of lines (null)", () => {
		const invalidNumberOfLines = null;

		expect(() => NumberOfLinesValueObject.create(invalidNumberOfLines)).toThrow(InvalidNumberOfLinesValueObjectError);
	});

	it("should return InvalidNumberOfLinesValueObjectError for an invalid number of lines (string)", () => {
		const invalidNumberOfLines = "invalid";

		expect(() => NumberOfLinesValueObject.create(invalidNumberOfLines as unknown as number)).toThrow(InvalidNumberOfLinesValueObjectError);
	});

	it("should return InvalidNumberOfLinesValueObjectError for an invalid number of lines (negative number)", () => {
		const invalidNumberOfLines = -5;

		expect(() => NumberOfLinesValueObject.create(invalidNumberOfLines)).toThrow(InvalidNumberOfLinesValueObjectError);
	});

	it("should return InvalidNumberOfLinesValueObjectError for an invalid number of lines (zero)", () => {
		const invalidNumberOfLines = 0;

		expect(() => NumberOfLinesValueObject.create(invalidNumberOfLines)).toThrow(InvalidNumberOfLinesValueObjectError);
	});

	it("should create a NumberOfLinesValueObject instance with a valid number of lines", () => {
		const validNumberOfLines = 10;

		const sut = NumberOfLinesValueObject.create(validNumberOfLines);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validNumberOfLines);
		expect(sut).toBeInstanceOf(NumberOfLinesValueObject);
	});
});
