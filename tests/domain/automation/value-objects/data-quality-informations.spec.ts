import { InvalidDisturbancesDescriptionValueObjectError, DisturbancesDescriptionValueObject } from "@/domain/automation";

describe("DisturbancesDescriptionValueObject", () => {
	it("should return InvalidDisturbancesDescriptionValueObjectError for an invalid disturbances description (null)", () => {
		const invalidDisturbancesDescription = null;

		expect(() => DisturbancesDescriptionValueObject.create(invalidDisturbancesDescription)).toThrow(InvalidDisturbancesDescriptionValueObjectError);
	});

	it("should return InvalidDisturbancesDescriptionValueObjectError for an invalid disturbances description (number)", () => {
		const invalidDisturbancesDescription = 123;

		expect(() => DisturbancesDescriptionValueObject.create(invalidDisturbancesDescription as unknown as string)).toThrow(InvalidDisturbancesDescriptionValueObjectError);
	});

	it("should return InvalidDisturbancesDescriptionValueObjectError for an invalid disturbances description (empty string)", () => {
		const invalidDisturbancesDescription = "";

		expect(() => DisturbancesDescriptionValueObject.create(invalidDisturbancesDescription)).toThrow(InvalidDisturbancesDescriptionValueObjectError);
	});

	it("should return InvalidDisturbancesDescriptionValueObjectError for an invalid disturbances description (string with length > 50)", () => {
		const invalidDisturbancesDescription = "ThisIsAnInvalidDisturbancesDescriptionWithLengthMoreThan50Characters";

		expect(() => DisturbancesDescriptionValueObject.create(invalidDisturbancesDescription)).toThrow(InvalidDisturbancesDescriptionValueObjectError);
	});

	it("should create a DisturbancesDescriptionValueObject instance with a valid disturbances description", () => {
		const validDisturbancesDescription = "Basic Disturbances Description";

		const sut = DisturbancesDescriptionValueObject.create(validDisturbancesDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validDisturbancesDescription);
		expect(sut).toBeInstanceOf(DisturbancesDescriptionValueObject);
	});
});
