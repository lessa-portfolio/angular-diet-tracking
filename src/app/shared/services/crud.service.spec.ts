import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CrudService } from './crud.service';
import { BaseResourceModel } from '../models/base-resource.model';
import { CoreModule } from 'src/app/core/core.module';

/*
  Classe criada para fins de testes. Ele herda todos os atributos de
  BaseResourceModel e pode ser usada para testar os retornos genérico.
*/
class TestModel extends BaseResourceModel {
  override id?: string;
  name?: string;

  static fromJson(jsonData: any): TestModel {
    return Object.assign(new TestModel(), jsonData);
  }
}

/*
  Classe criada para fins de testes. Ele herda todos os métodos e propriedades
  de CrudService e pode ser usado para criar instâncias específicas para testes.
*/
class TestableCrudService<T extends BaseResourceModel> extends CrudService<T> {
  constructor(apiPath: string, injector: Injector, jsonDataToResourceFn: (jsonData: any) => T) {
    super(apiPath, injector, jsonDataToResourceFn);
  }

  // Expor métodos protegidos para teste
  public exposeJsonDataToResources(jsonData: any[]): T[] {
    return this.jsonDataToResources(jsonData);
  }

  public exposeJsonDataToResource(jsonData: any): T {
    return this.jsonDataToResource(jsonData);
  }
}

describe('CrudService', () => {

  // injeta uma instância de TestableCrudService para uso nos testes.
  let service: TestableCrudService<TestModel>;

  // injeta o HttpTestingController para verificar solicitações HTTP durante os testes.
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: TestableCrudService,
          useFactory: (injector: Injector) => new TestableCrudService<TestModel>('api/path', injector, TestModel.fromJson),
          deps: [Injector],
        },
      ]
    });

    service = TestBed.inject(TestableCrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // verifica se todas as solicitações HTTP esperadas foram feitas
  afterEach(() => {
    httpMock.verify();
  });

  it('#testableCrudService: deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('#jsonDataToResources: deve converter um array de objetos para um array do tipo genérico desejado', () => {
    const jsonData = [{ id: '1', name: 'Recurso 1' }, { id: '2', name: 'Recurso 2' }];
    const resources = service.exposeJsonDataToResources(jsonData);

    expect(resources.length).toBe(2);
    expect(resources[0] instanceof TestModel).toBeTruthy();
    expect(resources[1] instanceof TestModel).toBeTruthy();
  });

  it('#jsonDataToResource: deve converter um objeto para o tipo genérico desejado', () => {
    const jsonData = { id: '1', name: 'Recurso 1' };
    const resource = service.exposeJsonDataToResource(jsonData);

    expect(resource.id).toBe(jsonData.id);
    expect(resource.name).toBe(jsonData.name);
    expect(resource instanceof TestModel).toBeTruthy();
  });

  it('#getAll: deve retornar uma lista de recursos', () => {
    const expectedData: TestModel[] = [{ id: '1', name: 'Recurso 1' }, { id: '2', name: 'Recurso 2' }];

    service.getAll().subscribe((resources) => {
      expect(resources.length).toBe(2);
      expect(resources[0] instanceof TestModel).toBeTruthy();
      expect(resources[1] instanceof TestModel).toBeTruthy();
    });

    const req = httpMock.expectOne('api/path');
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('#getById: deve retornar um recurso específico por ID', () => {
    const id = '1';
    const expectedData: TestModel = { id: '1', name: 'Recurso 1' };

    service.getById(id).subscribe((resource) => {
      expect(resource.id).toBe(expectedData.id);
      expect(resource.name).toBe(expectedData.name);
      expect(resource instanceof TestModel).toBeTruthy();
    });

    const req = httpMock.expectOne(`api/path/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('#create: deve criar um novo recurso', () => {
    const newResource: TestModel = { id: '3', name: 'Novo Recurso' };

    service.create(newResource).subscribe((createdResource) => {
      expect(createdResource.id).toBe(newResource.id);
      expect(createdResource.name).toBe(newResource.name);
      expect(createdResource instanceof TestModel).toBeTruthy();
    });

    const req = httpMock.expectOne('api/path');
    expect(req.request.method).toBe('POST');
    req.flush(newResource);
  });

  it('#update: deve atualizar um recurso existente', () => {
    const updatedResource: TestModel = { id: '1', name: 'Recurso Atualizado' };

    service.update(updatedResource).subscribe((result) => {
      expect(result).toBe(updatedResource);
    });

    const req = httpMock.expectOne(`api/path/${updatedResource.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedResource);
  });

  it('#delete: deve excluir um recurso por ID', () => {
    const id = '1';

    service.delete(id).subscribe((result) => {
      expect(result).toBeNull();
    });

    const req = httpMock.expectOne(`api/path/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Não há resposta do servidor para uma exclusão bem-sucedida
  });
});
