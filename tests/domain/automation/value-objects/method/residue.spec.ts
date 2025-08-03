import { InvalidResidueValueObjectError, ResidueValueObject } from "@/domain/automation";

describe("ResidueValueObject", () => {
	it("should return InvalidResidueValueObjectError for an invalid residue (null)", () => {
		const invalidResidue = null;

		expect(() => ResidueValueObject.create(invalidResidue)).toThrow(InvalidResidueValueObjectError);
	});

	it("should return InvalidResidueValueObjectError for an invalid residue (number)", () => {
		const invalidResidue = 123;

		expect(() => ResidueValueObject.create(invalidResidue as unknown as string)).toThrow(InvalidResidueValueObjectError);
	});

	it("should return InvalidResidueValueObjectError for an invalid residue (empty string)", () => {
		const invalidResidue = "";

		expect(() => ResidueValueObject.create(invalidResidue)).toThrow(InvalidResidueValueObjectError);
	});

	it("should return InvalidResidueValueObjectError for an invalid residue (string with length > 50)", () => {
		const invalidResidue = "c".repeat(51);

		expect(() => ResidueValueObject.create(invalidResidue)).toThrow(InvalidResidueValueObjectError);
	});

	it("should create a ResidueValueObject instance with a valid residue", () => {
		const validResidue = "Basic Residue";

		const sut = ResidueValueObject.create(validResidue);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validResidue);
		expect(sut).toBeInstanceOf(ResidueValueObject);
	});
});
