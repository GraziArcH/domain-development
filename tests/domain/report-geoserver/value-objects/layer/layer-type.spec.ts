import { LayerTypeValueObject } from "@/domain/report-geoserver";

describe("LayerTypeValueObject", () => {
	it("should return InvalidLayerTypeValueObjectError for an invalid layer type (null)", () => {
		const invalidLayerType = null;

		expect(() => LayerTypeValueObject.create(invalidLayerType)).toThrow();
	});

	it("should return InvalidLayerTypeValueObjectError for an invalid layer type (number)", () => {
		const invalidLayerType = 123;

		expect(() => LayerTypeValueObject.create(invalidLayerType as unknown as string)).toThrow();
	});

	it("should return InvalidLayerTypeValueObjectError for an invalid layer type (empty string)", () => {
		const invalidLayerType = "";

		expect(() => LayerTypeValueObject.create(invalidLayerType)).toThrow();
	});

	it("should return InvalidLayerTypeValueObjectError for an invalid layer type (string with length > 255)", () => {
		const invalidLayerType = "c".repeat(256);

		expect(() => LayerTypeValueObject.create(invalidLayerType)).toThrow();
	});

	it("should create a LayerTypeValueObject instance with a valid layer type", () => {
		const validLayerType = "ValidLayerType";

		const sut = LayerTypeValueObject.create(validLayerType);

		expect(sut).toBeInstanceOf(LayerTypeValueObject);
	});
});
