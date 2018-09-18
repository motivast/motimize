# Contribution guide
I’m really excited that you are interested in contributing to Motimize. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

## Development setup

### Clone project
```
git clone git@github.com:motivast/motimize.git
cd motimize
```

### Copy dotenv and fill with your properties
```
cp .env.example .env
```

### Code inspection and tests
Be sure to execute code inspection and test before before making a pull request.

## Commit message guidelines
A well-structured and described commit message helps better maintain open source project.

* current developers and users can quickly understand what new changes are about
* future developers have a clear history of changes in the code
* changelog is automatically generated from commit messages

Commit message is divided into sections **type**, **scope**, **subject**, **body**, **footer**. Only **type** and **subject** are required.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Commit message header **type**, **scope**, **subject** should not be longer than 72 chars.

### Type
Type describe what type of changes commit message introduces. You can choose from the following types:

* **build**: Changes that affect the build system or external dependencies (example scopes: composer, npm, phing, gulp)
* **ci**: Changes to our CI configuration files and scripts (example scopes: travis)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug or adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
* **test**: Adding tests or correcting existing tests

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any `BREAKING CHANGE`, the commit will always appear in the changelog.

### Scope
Scope describes which part of the code is affected by changes. There are no strict rules on what values scope can accept.

### Subject
Subject contains a short and concise description of changes in the code. Use the following rules to create subject:
* always start from capital letter
* do not end subject line with a period `.`
* start from keyword like "Add", "Fix", "Change", "Replace"
* use the imperative mode, "Fix bug" not "Fixed bug" or "Fixes bug"

### Body
The body contains a long description of changes in the code. As in the subject, use the imperative mode. Please write why changes to the code were required and how changes affect the behavior of the software compared to the previous version.

### Footer

#### Breaking changes
All breaking changes have to be included in the footer and start with `BREAKING CHANGE:`. Point which parts of the API have been changed and write an example of how API was used `before` changes and how should be used `after`. Also, provide a description how to migrate from previous to next version.

#### Referring to issues
If commit closes some issues please refer them in the footer from the beginning of the new line.

```
Closes #123
```

or in case of many issues

```
Closes #123, #234, #345
```
