import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";

import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export abstract class CrudService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiPath}/${id}`).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  public create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  public update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.apiPath}/${resource.id}`, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // Protected Methods

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];

    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));

    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  // Fazer uma função de tratativa de erro mais elaborada
  // Integrar com alguma ferramenta de monitoramento de logs
  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
