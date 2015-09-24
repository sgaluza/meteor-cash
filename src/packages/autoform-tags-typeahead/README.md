## Autoform Tags Typeahead

Extends autoform with a tags input including typeahead. Besides providing the input, it also takes care of storing the unique tags for use in the typeahead addition to autofill the input while typing.
 
## Installation

In a Meteor app directory, enter:

```
$ meteor add cloudspider:autoform-tags-typeahead
```

## Example usage

```javascript

SomeSchema = new SimpleSchema({
    tags: {
        type: [String],
        label: 'Tags',
        autoform: {
            type: 'tagsTypeahead',
        }
    }
});

```

Let's say that you fill in 3 tags: 

```
Amsterdam, Hamburg, Boston
```

### Above results in the following mongo record

```json
{
    "tags": {
        "Amsterdam",
        "Hamburg",
        "Boston"
    }
}
```

### And a separate Collection called cloudspider_tags

This collection is used as source for typeahead to autofill the input when typing
```json
{
    "name": "amsterdam",
    "title": "Amsterdam"
}
{
    "name": "hamburg",
    "title": "Hamburg"
}
{
    "name": "boston",
    "title": "Boston"
}
```

## Internal dependencies / credits
[ajduke:bootstrap-tagsinput](https://atmospherejs.com/ajduke/bootstrap-tagsinput) 

[mrt:bootstrap3-typeahead](https://atmospherejs.com/mrt/bootstrap3-typeahead) 