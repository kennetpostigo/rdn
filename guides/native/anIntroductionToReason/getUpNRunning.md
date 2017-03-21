# Get Up & Running

Getting up and running in reason is a bit different than your traditional programming language. Reason embraces sandboxed or self-contained environments for programming applications or libraries in Reason. So instead of installing reason globally on your machine and installing reason tools and editor plugins and configuring all of these yourself you use [ReasonProject](https://reasonml.github.io/ReasonProject/). It will automatically get this all setup for you.

```bash
git clone https://github.com/reasonml/ReasonProject.git [ project name ]
cd [ project name ]
npm install
```

Once you do this add the following to your **.bashrc**:

```bash
//pick your editor
export EDITOR=atom
export EDITOR=vim
export EDITOR=mvim
```

Then run this command in your project directory:

```js
npm run editor
```

#### Refmt

After you install all of this in your editor you should have `refmt` available to you. It is a powerful tool that will allow you to forget about code style and linting. It will automatically format your code to what is considered "standard" in Reason. This is great for a few reasons but most importantly that your code and another persons code will look the same, it will help readability and make it easier to understand code that is not your own. After you write some code or make changes to code type `cmd+shift+c` to format your code.

From here on out you should have:

* Syntax Highlighting
* Auto Completion
* In Editor Error Reporting
* Build Tools
* Code Formatting \(refmt\)

If you want to have a complete list of commands and tools available to you please consult the [ReasonProject Documentation](https://reasonml.github.io/ReasonProject/)

## Reason Extension

Reason is new and there aren't many resources out there written in Reason. However, because Reason is a new syntax on top of OCaml it is possible to convert OCaml to Reason. [Ricky Vetter](https://github.com/rickyvetter) created[ reason-tools](https://github.com/rickyvetter/reason-tools) for this purpose and it seamlessly converts OCaml resources \(docs, code, etc.\) into reason resources. You grab the reason-tools extension on [chrome](https://chrome.google.com/webstore/detail/reason-tools/kmdelnjbembbiodplmhgfjpecibfhadd)/[firefox](https://addons.mozilla.org/en-US/firefox/addon/reason-tools/).
