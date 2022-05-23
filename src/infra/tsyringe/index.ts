import { container } from 'tsyringe';
import ClientsModules from '@infra/tsyringe/modules/ClientsModules';
import DataGeneratorUtils from './utils/DataGeneratorUtils';

ClientsModules.Configure(container);
DataGeneratorUtils.Configure(container);
