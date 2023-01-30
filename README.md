# capacitor-facebook

capacitor facebook plugin

## Install

```bash
npm install capacitor-facebook
npx cap sync
```

## API

<docgen-index>

* [`init(...)`](#init)
* [`login(...)`](#login)
* [`logEvent(...)`](#logevent)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### init(...)

```typescript
init(options: { appId: string; }) => Promise<void>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ appId: string; }</code> |

--------------------


### login(...)

```typescript
login(options: { scope: string[] | null; }) => Promise<any>
```

| Param         | Type                                      |
| ------------- | ----------------------------------------- |
| **`options`** | <code>{ scope: string[] \| null; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### logEvent(...)

```typescript
logEvent(options: { name: string; valueToSum: number | void; bundle: Record<string, unknown> | void; }) => Promise<void>
```

| Param         | Type                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ name: string; valueToSum: number \| void; bundle: void \| <a href="#record">Record</a>&lt;string, unknown&gt;; }</code> |

--------------------


### Type Aliases


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>

</docgen-api>
