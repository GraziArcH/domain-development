import { SpotByLineFiltersEntityModel } from "@/domain/report";
import { SpotByLineFiltersDTO } from "@/domain/report";

describe("SpotByLineFiltersEntityModel", () => {
	it("should return an error for invalid spotByLineFiltersId", () => {
		const invalidSpotByLineFiltersId = -1;

		expect(() => SpotByLineFiltersEntityModel.create({
			spotByLineFiltersId: invalidSpotByLineFiltersId,
			spotByLineId: 1,
			filterId: 1,
			defaultValue: {},
			visible: true,
			active: true,
			createdBy: 1
		} as SpotByLineFiltersDTO)).toThrow();
	});

	it("should return an error for invalid spotByLineId", () => {
		const invalidSpotByLineId = -1;

		expect(() => SpotByLineFiltersEntityModel.create({
			spotByLineFiltersId: 1,
			spotByLineId: invalidSpotByLineId,
			filterId: 1,
			defaultValue: {},
			visible: true,
			active: true,
			createdBy: 1
		} as SpotByLineFiltersDTO)).toThrow();
	});

	it("should return an error for invalid filterId", () => {
		const invalidPrimarySpotFilterId = -1;

		expect(() => SpotByLineFiltersEntityModel.create({
			spotByLineFiltersId: 1,
			spotByLineId: 1,
			filterId: invalidPrimarySpotFilterId,
			defaultValue: {},
			visible: true,
			active: true,
			createdBy: 1
		} as SpotByLineFiltersDTO)).toThrow();
	});

	it("should create a spot by line primary filters model", () => {
		const spotByLineFiltersId = 1;
		const spotByLineId = 1;
		const filterId = 1;
		const defaultValue = {};
		const visible = true;
		const active = true;
		const createdBy = 1;

		const result = SpotByLineFiltersEntityModel.create({
			spotByLineFiltersId: spotByLineFiltersId,
			spotByLineId: spotByLineId,
			filterId: filterId,
			defaultValue: defaultValue,
			visible: visible,
			active: active,
			createdBy: createdBy
		} as SpotByLineFiltersDTO) as SpotByLineFiltersEntityModel;

		expect(result).toBeInstanceOf(SpotByLineFiltersEntityModel);
	});
});
