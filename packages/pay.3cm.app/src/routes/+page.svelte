<script lang="ts">
	// import type { PageProps } from './$types'
  // import { page } from "$app/state"
  import * as m from '$lib/paraglide/messages.js'
  import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger,  Tabs, TabItem, Card, ButtonGroup, Button, GradientButton } from "flowbite-svelte"
  // let activeUrl = $derived(page.url.pathname)
	// let { data }: PageProps = $props()
</script>

<Navbar>
  <NavBrand href="/">
    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{m.title()}</span>
  </NavBrand>
  <div class="flex md:order-2">
    <NavHamburger />
    <DarkMode />
  </div>
</Navbar>

<div class="flex flex-col place-content-center place-items-center">
  <Tabs tabStyle="underline">
    <TabItem open title="iSubscribe, Inc">
      <div class="flex flex-col gap-2">
        <Card size="lg" class="card">
          <h5 class="title">PROD</h5>
          <ButtonGroup>
            <Button href="https://billing.stripe.com/p/login/dR68y87D05hQcBq7ss" target="_blank">Billing Status</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/bIY01K6lE41R6JO3cc" target="_blank">One time</Button>
            <Button href="https://buy.stripe.com/bIY01K6lE41R6JO3cc?locale=zh" target="_blank">單次(中文)</Button>
            <Button href="https://buy.stripe.com/bIY01K6lE41R6JO3cc?locale=zh-tw" target="_blank">單次(中文-台灣)</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/5kA29S6lE1TJecg7su" target="_blank">$100 yearly</Button>
            <Button href="https://buy.stripe.com/aEU3dW6lE7e32ty8wx" target="_blank">$1 yearly</Button>
          </ButtonGroup>
        </Card>
        <Card size="lg" class="card">
          <h5 class="title">TEST</h5>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/test_fZe7t54yG1kZ7SwaEF" target="_blank">One time</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/test_eVacNp4yGd3H1u8bII" target="_blank">$1 yearly</Button>
          </ButtonGroup>
        </Card>
      </div>
    </TabItem>
    <TabItem title="3cm.app">
      <div class="flex flex-col gap-2">
        <Card size="lg" class="card">
          <h5 class="title">PROD</h5>
          <ButtonGroup>
            <Button href="https://billing.stripe.com/p/login/5kAbII0Kbbyw7te288" target="_blank">Billing Status</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/14keVQa8hfleg485kl" target="_blank">One time</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/eVa150eoxgpi8BG9AA" target="_blank">$100 yearly</Button>
            <Button href="https://buy.stripe.com/eVabJEfsBflecRW9AC" target="_blank">$1 yearly</Button>
          </ButtonGroup>
        </Card>
        <Card size="lg" class="card">
          <h5 class="title">TEST</h5>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/test_4gw15k6M5aqwgHC289" target="_blank">One time</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button href="https://buy.stripe.com/test_6oE29o5I1gOU2QM4gg" target="_blank">$1 yearly</Button>
          </ButtonGroup>
        </Card>
      </div>
    </TabItem>
  </Tabs>
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global {
    .card {
      @apply p-2 sm:p-4 md:p-6 flex flex-col place-items-center gap-2;
    }
  }
  .title {
    @apply mb-2 text-2xl font-bold tracking-tight text-gray-900;
    :global(.dark) & {
      @apply text-white;
    }
  }
</style>
