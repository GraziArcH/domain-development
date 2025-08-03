import {
	InvalidSpotTemplateLabelYValueObjectError,
	SpotTemplateLabelYValueObject,
} from "@/domain/report"; 

describe("SpotTemplateLabelYValueObject", () => {
	it("should return InvalidSpotTemplateLabelYValueObjectError for an invalid label Y (null)", () => {
		const invalidLabelY = null;

		expect(() => SpotTemplateLabelYValueObject.create(invalidLabelY)).toThrow(InvalidSpotTemplateLabelYValueObjectError);
	});

	it("should return InvalidSpotTemplateLabelYValueObjectError for an invalid label Y (number)", () => {
		const invalidLabelY = 123;

		expect(() => SpotTemplateLabelYValueObject.create(invalidLabelY as unknown as string)).toThrow(InvalidSpotTemplateLabelYValueObjectError);
	});

	it("should return InvalidSpotTemplateLabelYValueObjectError for an invalid label Y (empty string)", () => {
		const invalidLabelY = "";

		expect(() => SpotTemplateLabelYValueObject.create(invalidLabelY)).toThrow(InvalidSpotTemplateLabelYValueObjectError);
	});

	it("should return InvalidSpotTemplateLabelYValueObjectError for an invalid label Y (string with length > 30)", () => {
		const invalidLabelY = "InvalidLabelYWithLengthMoreThan30Characters";

		expect(() => SpotTemplateLabelYValueObject.create(invalidLabelY)).toThrow(InvalidSpotTemplateLabelYValueObjectError);
	});

	it("should create a SpotTemplateLabelYValueObject instance with a valid label Y", () => {
		const validLabelY = "BasicLabelY";

		const sut = SpotTemplateLabelYValueObject.create(validLabelY);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validLabelY);
		expect(sut).toBeInstanceOf(SpotTemplateLabelYValueObject);
	});
});
