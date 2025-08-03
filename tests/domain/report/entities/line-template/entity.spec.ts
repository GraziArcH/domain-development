import { ILineTemplateRepository, LineTemplateEntityModel, LineTemplateDTO, LineTemplateEntity, LineTemplateDTOWithoutId } from "@/domain/report";

describe("LineTemplateEntity", () => {
	let mockRepository: ILineTemplateRepository;
	let lineTemplateEntity: LineTemplateEntity;
	const mockEntityModel = LineTemplateEntityModel.create({
		lineTemplateId: 1,
		numberOfSpots: 5,
		active: true,
		createdBy: 1,
		reportTemplateId: 1,
		title: "Title",
		draggable: true,
		lineOrder: 1,
		name: 'Name'
	} as LineTemplateDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getByReportTemplateId: jest.fn()
		};

		lineTemplateEntity = new LineTemplateEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await lineTemplateEntity.create({
				numberOfSpots: -5,
				active: true,
				createdBy: -1,
				reportTemplateId: -1,
				title: "",
				draggable: true,
				lineOrder: -1,
				name: ''
			} as LineTemplateDTOWithoutId).catch(e => expect(e).toBeInstanceOf(Error));
		});
	
		it("should create line template", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as LineTemplateEntityModel));
	
			const result = await lineTemplateEntity.create({
				numberOfSpots: 5,
				active: true,
				createdBy: 1,
				reportTemplateId: 1,
				title: "Title",
				draggable: true,
				lineOrder: 1,
				name: 'Name'
			} as LineTemplateDTOWithoutId);
	
			expect(result).toEqual(mockEntityModel);
		});
	});
	
	describe("getById", () => {
		it("should return Error for an invalid line template id", async () => {
			await lineTemplateEntity.getById(0).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});
	
	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			await lineTemplateEntity.update({
				lineTemplateId: -1,
				numberOfSpots: -5,
				description: "",
				active: true,
				createdBy: -1,
				reportTemplateId: -1,
				title: "Title",
				draggable: true,
				lineOrder: 1,
				name: 'Name'
			} as LineTemplateDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});
	
		it("should return Error for a non-existing line template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);
	
			await lineTemplateEntity.update({
				lineTemplateId: 1,
				numberOfSpots: 5,
				active: true,
				createdBy: 1,
				reportTemplateId: 1,
				title: "Title",
				draggable: true,
				lineOrder: 1,
				name: 'Name'
			} as LineTemplateDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});
	
		it("should update line template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as LineTemplateEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as LineTemplateEntityModel));
	
			const result = await lineTemplateEntity.update({
				lineTemplateId: 1,
				numberOfSpots: 5,
				active: true,
				createdBy: 1,
				reportTemplateId: 1,
				title: "Title",
				draggable: true,
				lineOrder: 1,
				name: 'Name'
			} as LineTemplateDTO);
	
			expect(result).toEqual(mockEntityModel);
		});
	});
	
	describe("delete", () => {
		it("should return Error for an invalid line template id", async () => {
			await lineTemplateEntity.delete(0).catch(e => expect(e).toBeInstanceOf(Error));
		});
	
		it("should return Error for a non-existing line template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);
	
			await lineTemplateEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});
	
		it("should delete line template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as LineTemplateEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as LineTemplateEntityModel));
	
			const result = await lineTemplateEntity.delete(1);
	
			expect(result).toEqual(mockEntityModel);
		});
	});
	
});
