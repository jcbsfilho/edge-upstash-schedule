# Template Edge Application Schedule with Azion and Qstash

This template helps to create an edge function that will be the reciever for Qstash.

## QStash EdgeFunction Scheduler

## Prerequisites

Before use template, ensure that you have the following prerequisites:

- Azion account [visit the sing-up page](https://manager.azion.com/signup/)
- Upstash account (Sign up at [Upstash](https://upstash.com))

---

> - [Create an Azion account](#Create-an-Azion-account)
> - [Get Signing Keys](#Get-Signing-Keys)
> - [Deploy on Edge](#Deploy-on-Edge)
>   - [Marketplace](#Marketplace)
>   - [Github Actions](#Github-Actions)
> - [Schedule](#Schedule)

---

## Create an Azion account

To create an Azion account, just [visit the sing-up page](https://manager.azion.com/signup/) at [Azion's homepage](https://www.azion.com/en/).

---

## Get Signing Keys

Go to [Upstash Console](https://console.upstash.com/qstash) and copy the `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY`.


---

## Deploy on Edge

To perform the deploy on edge, you have two ways to do:

- By using Marketplace.
- By using GitHub actions.

### Marketplace

Build and Application [choose a template](https://manager.azion.com/build-application/build/choose-template)

Choose **QStash EdgeFunction Scheduler** template

Generate your personal github token by visiting the documentation at [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

Enter the information in the settings tab:

- `Application Name`: Application name in RTM Azion
- `Edge Function args`: JSON args required for build and connection to redis database { QSTASH_CURRENT_SIGNING_KEY: "", QSTASH_NEXT_SIGNING_KEY: ""}
- `Github Personal Token`: Github Personal Token

---

## Github Actions

### Secrets Github

Accessing your secrets [Add Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### Azion Personal token

Create your Azion personal token by visiting the [Personal Token creating page](https://manager.azion.com/iam/personal-tokens)

Add the Personal Token to the `secrets`:

```bash
    AZION_PERSONAL_TOKEN=<value>
```

Environments for use in the action workflow:

```yml
  - name: edge-...
    id: azion_edge
    ...
    with:
        ....
        azionPersonalToken: ${{ secrets.AZION_PERSONAL_TOKEN }}
        ....

```


Add the Redis Database access credentials to the `secrets`:

```bash
    QSTASH_CURRENT_SIGNING_KEY=<value>
```

```bash
    QSTASH_NEXT_SIGNING_KEY=<value>
```

Environments for use in the action workflow:

```yml
 - name: Create args file
    run: |
        ...
        "QSTASH_CURRENT_SIGNING_KEY": "${{ secrets.QSTASH_CURRENT_SIGNING_KEY }}",
        "QSTASH_NEXT_SIGNING_KEY": "${{ secrets.QSTASH_NEXT_SIGNING_KEY }}"
        ...
```

> **Note**: for automatic deployment, create a pull request to the main branch.


## Schedule

Open a different terminal and publish a message to QStash. 
> Note: the destination url is the same that was printed in the previous deploy step.

### Get your Token

Go to [Upstash Console](https://console.upstash.com/qstash) and copy the `QSTASH_TOKEN`.

### Scheduled

> Note: You can publish messages using [REST API](https://docs.upstash.com/qstash/apiexamples)

```bash

# Every Minute

curl --request POST "https://qstash.upstash.io/v1/publish/{change here destination url}" \
     -H "Authorization: Bearer { change here token rest}" \
     -H "Content-Type: application/json" \
     -H "Upstash-Cron: * * * * *" \
     -d "{ \"hello\": \"world\"}"


# Every 10 Minute

curl --request POST "https://qstash.upstash.io/v1/publish/{change here destination url}" \
     -H "Authorization: Bearer { change here token rest}" \
     -H "Content-Type: application/json" \
     -H "Upstash-Cron: */10 * * * *" \
     -d "{ \"hello\": \"world\"}"


# Every Hour

curl --request POST "https://qstash.upstash.io/v1/publish/{change here destination url}" \
     -H "Authorization: Bearer { change here token rest}" \
     -H "Content-Type: application/json" \
     -H "Upstash-Cron: 0 * * * *" \
     -d "{ \"hello\": \"world\"}"


```

### Once

```bash

curl --request POST "https://qstash.upstash.io/v1/publish/{change here destination url}" \
     -H "Authorization: Bearer { change here token rest}" \
     -H "Content-Type: application/json" \
     -d "{ \"hello\": \"world\"}"

```
