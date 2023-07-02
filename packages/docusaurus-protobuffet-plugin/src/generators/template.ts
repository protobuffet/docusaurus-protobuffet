const template = `---
title: {{getLeafFileName name}}
hide_title: true
---

import { ProtoMessage, ProtoServiceMethod, ProtoEnum } from '@theme/ProtoFile';

# \`{{getLeafFileName name}}\`
_**path** {{{name}}}_

_**package** {{{package}}}_

{{{description}}}

---

{{#if messages}}
## Messages

{{#each messages}}

### \`{{{longName}}}\`
<ProtoMessage key=\{ {{~@index~}} \} message=\{ {{~{stringify this}~}} \} />

{{/each}}
---
{{/if}}
{{#if enums}}
## Enums


{{#each enums}}
### \`{{{longName}}}\`
<ProtoEnum key=\{ {{~@index~}} \} enumb=\{ {{~{stringify this}~}} \} />

{{/each}}
---
{{/if}}
{{#if services}}
## Services

{{#each services}}

### \`{{{name}}}\`

{{{description}}}


{{#each methods}}
#### \`{{name}}\`
<ProtoServiceMethod key=\{'{{~name}}-{{@index}}'\} method=\{ {{~{stringify this}~}} \} />


{{/each}}
{{/each}}
---
{{/if}}


  `;

export default template;
