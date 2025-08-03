import { InvalidErrorMeasurementsValueObjectError, ErrorMeasurementsValueObject } from "@/domain/automation";

describe("ErrorMeasurementsValueObject", () => {
	it("should return InvalidErrorMeasurementsValueObjectError for an invalid error measurements (null)", () => {
		const invalidErrorMeasurements = null;

		expect(() => ErrorMeasurementsValueObject.create(invalidErrorMeasurements as unknown as number)).toThrow(InvalidErrorMeasurementsValueObjectError);
	});

	it("should return InvalidErrorMeasurementsValueObjectError for an invalid error measurements (string)", () => {
		const invalidErrorMeasurements = "invalid";

		expect(() => ErrorMeasurementsValueObject.create(invalidErrorMeasurements as unknown as number)).toThrow(InvalidErrorMeasurementsValueObjectError);
	});

	it("should return InvalidErrorMeasurementsValueObjectError for an invalid error measurements (negative number)", () => {
		const invalidErrorMeasurements = -1;

		expect(() => ErrorMeasurementsValueObject.create(invalidErrorMeasurements)).toThrow(InvalidErrorMeasurementsValueObjectError);
	});

	it("should return InvalidErrorMeasurementsValueObjectError for an invalid error measurements (zero)", () => {
		const invalidErrorMeasurements = 0;

		expect(() => ErrorMeasurementsValueObject.create(invalidErrorMeasurements)).toThrow(InvalidErrorMeasurementsValueObjectError);
	});

	it("should create an ErrorMeasurementsValueObject instance with a valid error measurements", () => {
		const validErrorMeasurements = 10;

		const sut = ErrorMeasurementsValueObject.create(validErrorMeasurements);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validErrorMeasurements);
		expect(sut).toBeInstanceOf(ErrorMeasurementsValueObject);
	});
});
