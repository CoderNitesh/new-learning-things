
/***
 * Types in typescript
 * 
 * let name: string;
 * let age: number;
 * let isAdult: boolean;
 * let something: any; --> it means you can store here any data type
 * let something: unknown --> it better way than use of any (recomanded way if you dont know the type)
 * let hobbies: string[]; --> array of string
 * let role: [number, string] --> tuple
 * 
 * 
 * **** LET SEE HOW TO DEFINE THE OBJECT ****
 * 
 * let person: Object --> one way but not recomanded
 * 
 * THERE ARE 2 MORE WAYS (type, interface)
 * 
 * STEP 1: CREATE TYPE
 * type Person{
 *    name: string;
 *    age?: number;  --> ? means this property is optional in this object 
 * }
 * 
 * STEP 2: ASSIGN TO THE VARIABLE 
 * let person: Person = {
 *    name: 'nitesh',
 *    age: 22
 * }
 * 
 * 
 * **** LETS SEE HOW TO DEFINE THE ARRAY WHICH CONTAIN THE OBJECT OF PERSON TYPE ****
 * 
 * let personTypeObject: Person[];  --> as simple as that
 * 
 * 
 * **** LET'S MOVE FOREWARD WHAT IF I WANT TO STORE A STRING OR NUMBER IN ONE VARIABLE FOR THAT WE USE UNION ****
 * 
 * let age: number | string;  --> union
 * age = 1;
 * age = 'one'  both are valid
 * 
 * 
 * *** LET'S SEE HOW TO DEFINE THE FUNCTION NOW 
 * 
 * ONE WAY
 * 
 * let printName: Function;
 * 
 * ANOTHER WAY (RECOMENDED WAY)
 * 
 * let printName: (name: string) => : void; 
 * let printName: (name: string) => : never; 
 * let printName: (name: string) => : string; 
 * let printPerson: (name: string) => : Person[]; 
 * 
 * void and never difference -> "void" means return undefined <-- where --> "never" means return nothing
 * 
 * 
 * TYPE ALIAS
 * 
 * type and interface
 * 
 * type Person = {
 *    name: string;
 *    age: number;
 *    email?: string;
 *    isAdult?: boolean;
 * }
 * 
 * interface Person {
 *    name: string;
 *    age: number;
 *    email?: string;
 *    isAdult?: boolean;
 * }
 * 
 * SO WHAT IS DIFFERENCE BETWEEN THEM 
 * 
 * ONE DIFFERENCE IN THERE EXTENDS 
 * type X = {
 *  a: string;
 *  b: number;
 * }
 * 
 * type Y = X & {
 *  c: string;
 *  d: X[];
 * }
 * *****************************
 * interface X {
 *  a: string;
 *  b: number;
 * }
 * 
 * interface Y extends X {
 *  c: string;
 *  d: X[];
 * }
 * 
 * IF YOU WANT TO EXTENDS THE INTERFACE WITH TYPE THAT ALSO POSSIBLE AND VICE A VERSA
 */