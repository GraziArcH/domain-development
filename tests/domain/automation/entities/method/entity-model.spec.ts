import { MethodEntityModel } from "@/domain/automation";
import { MethodDTO } from "@/domain/automation";

describe("MethodEntityModel", () => {
	it("should return an error if methodId is invalid", () => {
		const invalidMethodId = -1;
		const onsMethodologyId = 2;
		const validMethodDescription = "Sample method description";
		const validResidue = "0.5";
		const validSkill = "0.8";
		const validErrorMeasurements = 0.1;

		expect(() => MethodEntityModel.create({
			methodId: invalidMethodId,
			onsMethodologyId,
			methodDescription: validMethodDescription,
			residue: validResidue,
			skill: validSkill,
			errorMeasurements: validErrorMeasurements,
		})).toThrow();

	});

	it("should return an error if onsMethodologyId is invalid", () => {
		const validMethodId = 1;
		const invalidOnsMethodologyId = -2;
		const validMethodDescription = "Sample method description";
		const validResidue = "0.5";
		const validSkill = "0.8";
		const validErrorMeasurements = 0.1;

		expect(() => MethodEntityModel.create({
			methodId: validMethodId,
			onsMethodologyId: invalidOnsMethodologyId,
			methodDescription: validMethodDescription,
			residue: validResidue,
			skill: validSkill,
			errorMeasurements: validErrorMeasurements,
		} as MethodDTO)).toThrow();

	});

	it("should return an error if methodDescription is invalid", () => {
		const validMethodId = 1;
		const validOnsMethodologyId = 2;
		const invalidMethodDescription = "";
		const validResidue = "0.5";
		const validSkill = "0.8";
		const validErrorMeasurements = 0.1;

		expect(() => MethodEntityModel.create({
			methodId: validMethodId,
			onsMethodologyId: validOnsMethodologyId,
			methodDescription: invalidMethodDescription,
			residue: validResidue,
			skill: validSkill,
			errorMeasurements: validErrorMeasurements,
		} as MethodDTO)).toThrow();

	});

	it("should return an error if residue is invalid", () => {
		const validMethodId = 1;
		const validOnsMethodologyId = 2;
		const validMethodDescription = "Sample method description";
		const invalidResidue = "";
		const validSkill = "0.8";
		const validErrorMeasurements = 0.1;

		expect(() => MethodEntityModel.create({
			methodId: validMethodId,
			onsMethodologyId: validOnsMethodologyId,
			methodDescription: validMethodDescription,
			residue: invalidResidue,
			skill: validSkill,
			errorMeasurements: validErrorMeasurements,
		} as MethodDTO)).toThrow();

	});

	it("should return an error if skill is invalid", () => {
		const validMethodId = 1;
		const validOnsMethodologyId = 2;
		const validMethodDescription = "Sample method description";
		const validResidue = "0.5";
		const invalidSkill = "";
		const validErrorMeasurements = 0.1;

		expect(() => MethodEntityModel.create({
			methodId: validMethodId,
			onsMethodologyId: validOnsMethodologyId,
			methodDescription: validMethodDescription,
			residue: validResidue,
			skill: invalidSkill,
			errorMeasurements: validErrorMeasurements,
		} as MethodDTO)).toThrow();

	});

	it("should return an error if errorMeasurements is invalid", () => {
		const validMethodId = 1;
		const validOnsMethodologyId = 2;
		const validMethodDescription = "Sample method description";
		const validResidue = "0.5";
		const validSkill = "0.8";
		const invalidErrorMeasurements = -0.1;

		expect(() => MethodEntityModel.create({
			methodId: validMethodId,
			onsMethodologyId: validOnsMethodologyId,
			methodDescription: validMethodDescription,
			residue: validResidue,
			skill: validSkill,
			errorMeasurements: invalidErrorMeasurements,
		} as MethodDTO)).toThrow();

	});

	it("should create a MethodEntityModel instance with valid values", () => {
		const validMethodId = 1;
		const validOnsMethodologyId = 2;
		const validMethodDescription = "Sample method description";
		const validResidue = "0.5";
		const validSkill = "0.8";
		const validErrorMeasurements = 0.1;

		const sut = MethodEntityModel.create({
			methodId: validMethodId,
			onsMethodologyId: validOnsMethodologyId,
			methodDescription: validMethodDescription,
			residue: validResidue,
			skill: validSkill,
			errorMeasurements: validErrorMeasurements,
		} as MethodDTO) as MethodEntityModel;

		expect(sut).toBeInstanceOf(MethodEntityModel);
		expect(sut.methodId.value).toBe(validMethodId);
		expect(sut.onsMethodologyId.value).toBe(validOnsMethodologyId);
		expect(sut.methodDescription.value).toBe(validMethodDescription);
		expect(sut.residue.value).toBe(validResidue);
		expect(sut.skill.value).toBe(validSkill);
		expect(sut.errorMeasurements.value).toBe(validErrorMeasurements);
	});
});
