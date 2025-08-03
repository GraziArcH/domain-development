import { LineTemplateTitleValueObject } from "@/domain/report"; 

describe("LineTemplateTitleValueObject", () => {
	it("should return InvalidLineTemplateTitleValueObjectError for an invalid line template title (null)", () => {
		const invalidLineTemplateTitle = null;

		expect(() => LineTemplateTitleValueObject.create(invalidLineTemplateTitle)).toThrow();
	});

	it("should return InvalidLineTemplateTitleValueObjectError for an invalid line template title (number)", () => {
		const invalidLineTemplateTitle = 123;

		expect(() => LineTemplateTitleValueObject.create(invalidLineTemplateTitle as unknown as string)).toThrow();
	});

	it("should return InvalidLineTemplateTitleValueObjectError for an invalid line template title (empty string)", () => {
		const invalidLineTemplateTitle = "";

		expect(() => LineTemplateTitleValueObject.create(invalidLineTemplateTitle)).toThrow();
	});

	it("should return InvalidLineTemplateTitleValueObjectError for an invalid line template title (string with length > 100)", () => {
		const invalidLineTemplateTitle = "InvalidLineTemplateTitleWithLengthMoreThan100Charactersaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

		expect(() => LineTemplateTitleValueObject.create(invalidLineTemplateTitle)).toThrow();
	});

	it("should create a LineTemplateTitleValueObject instance with a valid line template description", () => {
		const validLineTemplateDescription = "Basic Line Template Description";

		const sut = LineTemplateTitleValueObject.create(validLineTemplateDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validLineTemplateDescription);
		expect(sut).toBeInstanceOf(LineTemplateTitleValueObject);
	});
});