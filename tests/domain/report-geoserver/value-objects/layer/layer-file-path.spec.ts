import { LayerFilePathValueObject } from "@/domain/report-geoserver";

describe("LayerFilePathValueObject", () => {
	it("should return InvalidLayerFilePathValueObjectError for an invalid layer file path (null)", () => {
		const invalidLayerFilePath = null;

		expect(() => LayerFilePathValueObject.create(invalidLayerFilePath)).toThrow();
	});

	it("should return InvalidLayerFilePathValueObjectError for an invalid layer file path (number)", () => {
		const invalidLayerFilePath = 123;

		expect(() => LayerFilePathValueObject.create(invalidLayerFilePath as unknown as string)).toThrow();
	});

	it("should return InvalidLayerFilePathValueObjectError for an invalid layer file path (empty string)", () => {
		const invalidLayerFilePath = "";

		expect(() => LayerFilePathValueObject.create(invalidLayerFilePath)).toThrow();
	});

	it("should return InvalidLayerFilePathValueObjectError for an invalid layer file path (string with length > 255)", () => {
		const invalidLayerFilePath = "c".repeat(256);

		expect(() => LayerFilePathValueObject.create(invalidLayerFilePath)).toThrow();
	});

	it("should create a LayerFilePathValueObject instance with a valid layer file path", () => {
		const validLayerFilePath = "Valid/Layer/FilePath.txt";

		const sut = LayerFilePathValueObject.create(validLayerFilePath);

		expect(sut).toBeInstanceOf(LayerFilePathValueObject);
	});
});
