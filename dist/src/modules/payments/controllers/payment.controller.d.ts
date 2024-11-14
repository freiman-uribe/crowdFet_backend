import { BadRequestException } from '@nestjs/common';
import { IMulterFile } from 'src/types/multer';
import { TransactionService } from '../services/transaction.service';
import { EventsGateway } from 'src/events/events.gateway';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { ProjectService } from 'src/modules/project/services/project.service';
import { UserService } from 'src/modules/user/services/user.service';
export interface FilesDataCar {
    tarjeta_de_propietario: IMulterFile[];
    seguro: IMulterFile[];
    seguro_todo_riesgo: IMulterFile[];
    tecnomecanica: IMulterFile[];
}
export declare class PaymentController {
    private readonly transactionService;
    private readonly eventsGateway;
    private readonly authService;
    private readonly projectService;
    private readonly userService;
    constructor(transactionService: TransactionService, eventsGateway: EventsGateway, authService: AuthService, projectService: ProjectService, userService: UserService);
    getPlansEstudents(req: any): Promise<void>;
    checkoutPayment(req: any, queryParams: any): Promise<boolean>;
    create(req: any, body: any, projectId: string): Promise<BadRequestException | {
        reference: string;
        signature: string;
        totalPayment: number;
    }>;
}
