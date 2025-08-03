import { InvalidSkillValueObjectError, SkillValueObject } from "@/domain/automation";

describe("SkillValueObject", () => {
	it("should return InvalidSkillValueObjectError for an invalid skill (null)", () => {
		const invalidSkill = null;

		expect(() => SkillValueObject.create(invalidSkill)).toThrow(InvalidSkillValueObjectError);
	});

	it("should return InvalidSkillValueObjectError for an invalid skill (number)", () => {
		const invalidSkill = 123;

		expect(() => SkillValueObject.create(invalidSkill as unknown as string)).toThrow(InvalidSkillValueObjectError);
	});

	it("should return InvalidSkillValueObjectError for an invalid skill (empty string)", () => {
		const invalidSkill = "";

		expect(() => SkillValueObject.create(invalidSkill)).toThrow(InvalidSkillValueObjectError);
	});

	it("should return InvalidSkillValueObjectError for an invalid skill (string with length > 50)", () => {
		const invalidSkill = "c".repeat(51);

		expect(() => SkillValueObject.create(invalidSkill)).toThrow(InvalidSkillValueObjectError);
	});

	it("should create a SkillValueObject instance with a valid skill", () => {
		const validSkill = "Basic Skill";

		const sut = SkillValueObject.create(validSkill);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validSkill);
		expect(sut).toBeInstanceOf(SkillValueObject);
	});
});
