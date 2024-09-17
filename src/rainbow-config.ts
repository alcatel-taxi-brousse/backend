import { DataStoreType } from 'rainbow-node-sdk/lib/config/config';

type RainbowConfig = {
  rainbow: { mode: string; host: string };
  application: { appID: string; appSecret: string };
  im: {
    autoInitialBubbleFormat: string;
    rateLimitPerHour: number;
    messagesDataStore: DataStoreType;
    sendReadReceipt: boolean;
    autoInitialBubblePresence: boolean;
    enableCarbon: boolean;
    autoInitialGetBubbles: boolean;
    autoLoadConversationHistory: boolean;
    storeMessages: boolean;
    autoLoadConversations: boolean;
    nbMaxConversations: number;
    storeMessagesInConversation: boolean;
    autoInitialBubbleUnsubscribed: boolean;
    enablesendurgentpushmessages: boolean;
    autoLoadContacts: boolean;
    useMessageEditionAndDeletionV2: boolean;
    sendMessageToConnectedUser: boolean;
    conversationsRetrievedFormat: string;
    copyMessage: boolean;
    messageMaxLength: number;
  };
  credentials: { password: string; login: string };
  testOutdatedVersion: boolean;
  logs: {
    zippedArchive: boolean;
    path: string;
    enableEventsLogs: boolean;
    color: boolean;
    level: string;
    enableEncryptedLogs: boolean;
    'system-dev': { http: boolean; internals: boolean };
    maxSize: string;
    maxFiles: undefined;
    enableConsoleLog: boolean;
  };
  servicesToStart: {
    favorites: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    settings: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    fileStorage: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    im: { start_up: boolean; logEntryParameters: boolean; optional: boolean };
    invitation: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    rpcoverxmpp: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    profiles: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    groups: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    admin: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    httpoverxmpp: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    conversations: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    fileServer: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    alerts: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    channels: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    s2s: { start_up: boolean; logEntryParameters: boolean; optional: boolean };
    calllog: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    telephony: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    rbvoice: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    bubbles: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    presence: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    contacts: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
    webinar: {
      start_up: boolean;
      logEntryParameters: boolean;
      optional: boolean;
    };
  };
};

export const rainbowConfig: RainbowConfig = {
  rainbow: {
    host: 'sandbox',
    mode: 'xmpp',
  },
  credentials: {
    login: 'user@xxxx.xxx',
    password: 'XXXXX',
  },
  application: {
    appID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    appSecret:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  // Logs options
  logs: {
    enableConsoleLog: false,
    color: true,
    level: 'info',
    path: '',
    enableEventsLogs: false,
    enableEncryptedLogs: false,
    'system-dev': {
      internals: false,
      http: false,
    },
    zippedArchive: false,
    maxSize: '',
    maxFiles: undefined,
  },
  testOutdatedVersion: true,
  im: {
    sendReadReceipt: true,
    messageMaxLength: 1024,
    sendMessageToConnectedUser: false,
    conversationsRetrievedFormat: 'small',
    storeMessages: true,
    nbMaxConversations: 15,
    rateLimitPerHour: 1000,
    messagesDataStore: DataStoreType.StoreTwinSide,
    autoInitialBubblePresence: true,
    autoLoadConversations: true,
    autoLoadContacts: true,
    copyMessage: false,
    autoInitialGetBubbles: false,
    autoInitialBubbleFormat: '',
    autoInitialBubbleUnsubscribed: false,
    autoLoadConversationHistory: false,
    enableCarbon: false,
    enablesendurgentpushmessages: false,
    useMessageEditionAndDeletionV2: false,
    storeMessagesInConversation: false,
  },
  servicesToStart: {
    s2s: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    presence: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    contacts: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    conversations: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    im: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    profiles: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    groups: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    bubbles: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    telephony: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    channels: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    admin: {
      start_up: false,
      optional: true,
      logEntryParameters: false,
    },
    fileServer: {
      start_up: false,
      optional: true,
      logEntryParameters: false,
    },
    fileStorage: {
      start_up: false,
      optional: true,
      logEntryParameters: false,
    },
    calllog: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    favorites: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    alerts: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    invitation: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    settings: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    webinar: {
      start_up: false,
      optional: true,
      logEntryParameters: false,
    },
    rbvoice: {
      start_up: false,
      optional: true,
      logEntryParameters: false,
    },
    httpoverxmpp: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
    rpcoverxmpp: {
      start_up: true,
      optional: true,
      logEntryParameters: false,
    },
  },
};
