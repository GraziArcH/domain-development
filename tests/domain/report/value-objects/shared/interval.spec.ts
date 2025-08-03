import { InvalidIntervalValueObjectError, IntervalValueObject } from "@/domain/report";

describe("IntervalValueObject", () => {
	it("should return InvalidIntervalValueObjectError for an invalid interval (null)", () => {
		const invalidInterval = null;

		expect(() => IntervalValueObject.create(invalidInterval as unknown as string)).toThrow(InvalidIntervalValueObjectError);
	});

	it("should return InvalidIntervalValueObjectError for an invalid interval (number)", () => {
		const invalidInterval = 123;

		expect(() => IntervalValueObject.create(invalidInterval as unknown as string)).toThrow(InvalidIntervalValueObjectError);
	});

	it("should return InvalidIntervalValueObjectError for an invalid interval (empty string)", () => {
		const invalidInterval = "";

		expect(() => IntervalValueObject.create(invalidInterval)).toThrow(InvalidIntervalValueObjectError);
	});

	it("should return InvalidIntervalValueObjectError for an invalid interval (string with length > 10)", () => {
		const invalidInterval = "InvalidIntervalWithLengthMoreThan10Characters";

		expect(() => IntervalValueObject.create(invalidInterval)).toThrow(InvalidIntervalValueObjectError);
	});

	it("should create an IntervalValueObject instance with a valid interval", () => {
		const validInterval = "ValidIntvl";

		const sut = IntervalValueObject.create(validInterval);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validInterval);
		expect(sut).toBeInstanceOf(IntervalValueObject);
	});
});
