import {
	InvalidSpotTemplateLabelXValueObjectError,
	SpotTemplateLabelXValueObject,
} from "@/domain/report"; 

describe("SpotTemplateLabelXValueObject", () => {
	it("should return InvalidSpotTemplateLabelXValueObjectError for an invalid label X (null)", () => {
		const invalidLabelX = null;

		expect(() => SpotTemplateLabelXValueObject.create(invalidLabelX)).toThrow(InvalidSpotTemplateLabelXValueObjectError);
	});

	it("should return InvalidSpotTemplateLabelXValueObjectError for an invalid label X (number)", () => {
		const invalidLabelX = 123;

		expect(() => SpotTemplateLabelXValueObject.create(invalidLabelX as unknown as string)).toThrow(InvalidSpotTemplateLabelXValueObjectError);
	});

	it("should return InvalidSpotTemplateLabelXValueObjectError for an invalid label X (empty string)", () => {
		const invalidLabelX = "";

		expect(() => SpotTemplateLabelXValueObject.create(invalidLabelX)).toThrow(InvalidSpotTemplateLabelXValueObjectError);
	});

	it("should return InvalidSpotTemplateLabelXValueObjectError for an invalid label X (string with length > 30)", () => {
		const invalidLabelX = "InvalidLabelXWithLengthMoreThan30Characters";

		expect(() => SpotTemplateLabelXValueObject.create(invalidLabelX)).toThrow(InvalidSpotTemplateLabelXValueObjectError);
	});

	it("should create a SpotTemplateLabelXValueObject instance with a valid label X", () => {
		const validLabelX = "BasicLabelX";

		const sut = SpotTemplateLabelXValueObject.create(validLabelX);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validLabelX);
		expect(sut).toBeInstanceOf(SpotTemplateLabelXValueObject);
	});
});
