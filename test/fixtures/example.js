var value = "v";

gettext("translated text");
_("uses underscore");
_('has several translations');gettext("in one line");

value;



_('pipeless multiline syntax');

gettext("this is line 13");


/* L10n: comments for translator would be cool */ _("because sometimes one need context");
gettext('and yeah - feel free to use " here');

/* look out for those quotes */ _("or to use ' here");



/* even if the look like L10n: or gettext('invocation') */ _('attributes');


/* L10n: only first attribut can have comments though */ gettext("because jade generally doesn't care");
_('how you format your line');
'/this/is/not/something/you/want/to/translate';
_('This link is in line 28 and it better points somewhere!');

gettext("or you can");_('put multiple attributes');_('in line one line (31)');

"http://some-link-here/";n_('Potato', 'Potatoes', 5);n_('Apple', 'Apples', 1);

_("Parameters in mixins"), _("They will be extracted as well");


pageTitle = title + ' | ' + _("In code blocks");


'/path';_("In conditionals");
