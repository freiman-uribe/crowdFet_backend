import { ProgramAcademicService } from '../services/program-academic.service';
import { CommonService } from '../services/common.service';
export declare class CommonController {
    private readonly programAcademic;
    private readonly commonService;
    constructor(programAcademic: ProgramAcademicService, commonService: CommonService);
    getProgramsAcademics(): Promise<{
        id: string;
        created_by: string | null;
        created_at: Date;
        modified_by: string | null;
        updated_at: Date;
        status: boolean;
        name: string | null;
        code: string | null;
    }[]>;
    getListItemForParent(codes: string[]): Promise<any>;
}
