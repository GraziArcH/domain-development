import { ReportAggregateModel, ReportDTO } from "@/domain/report";

describe("ReportAggregateModel", () => {
	it("should create a ReportAggregateModel instance with valid inputs", () => {
		const dto: ReportDTO = {
			reportId: 1,
			reportDescription: "This is a sample report",
			numberOfLines: 2,
			reportName: "Sample Report",
			reportTitle: "Sample Report Title",
			filters: [
				{
					value: "Filter 1",
					type: "type1",
					action: "action1",
					classification: "classification1",
					innerFilters: [
						{
							value: "Inner Filter 1",
							type: "innerType1",
							action: "innerAction1",
							innerFilters: [],
						},
						{
							value: "Inner Filter 2",
							type: "innerType2",
							action: "innerAction2",
							innerFilters: [],
						},
					],
				},
				{
					value: "Filter 2",
					type: "type2",
					action: "action2",
					classification: "classification2",
				},
			],
			lines: [
				{
					lineId: 1,
					draggable: true,
					lineOrder: 1,
					title: "Line 1",
					spots: [
						{
							spotId: 1,
							spotName: "Spot 1",
							spotType: "type1",
							title: "Spot 1 Title",
							format: {},
							legend: "Legend 1",
							description: "Spot 1 Description",
							spotOrder: 1,
						},
					],
					filters: [
						{
							value: "Line 1 Filter",
							type: "lineFilterType",
							action: "lineFilterAction",
							classification: "lineFilterClassification",
						},
					],
				},
				{
					lineId: 2,
					draggable: true,
					lineOrder: 2,
					title: "Line 2",
					spots: [
						{
							spotId: 2,
							spotName: "Spot 2",
							spotType: "type2",
							title: "Spot 2 Title",
							format: {},
							legend: "Legend 2",
							description: "Spot 2 Description",
							spotOrder: 1,
						},
					],
					filters: [],
				},
			],
		};

		const sut = ReportAggregateModel.create(dto);

		expect(sut).toBeInstanceOf(ReportAggregateModel);
	});
});
