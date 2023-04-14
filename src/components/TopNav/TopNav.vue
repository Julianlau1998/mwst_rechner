<template>
    <div class="is-topnav has-text-left p-3 pb-4 pt-4">
        <div class="columns is-mobile">
            <div class="column pl-5 is-pointer">
                <span @click="home">
                    MwSt-Rechner
                </span>
            </div>
            <div class="column settingsWrapper">
                <div v-if="settings" class="settingsItems settings">
                    <span v-if="helpAvailable">
                        <span @click="openSettings" class="is-icon-container is-pointer mt-6 setting noselect">
                            <i
                                class="fas fa-wrench is-smallIcon pr-1"
                            />
                            Settings
                        </span>
                    </span>
                    <!-- <div class="hr" />
                    <span v-if="helpAvailable">
                        <span @click="openHelp" class="is-pointer mt-6 setting noselect">
                            Help
                        </span>
                    </span> -->
                </div>
                <i
                    class="fas fa-bars settings-icon is-pointer"
                    @click="settings=!settings"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopNav',
    props: {
        helpAvailable: {
            required: false,
            default: true
        }
    },
    data () {
        return {
            settings: false,
            shareAvailable: false,
            playBillingSupported: false
        }
    },
    created () {
        this.checkPlayBillingAvailable()
        if(navigator.share !== undefined) {
            this.shareAvailable = true
        }
    },
    methods: {
        async checkPlayBillingAvailable () {
            if ('getDigitalGoodsService' in window) {
                const service = await window.getDigitalGoodsService('https://play.google.com/billing');
                if (service) {
                    this.playBillingSupported = true
                }
            }
        },
        help () {
            this.$router.push('/help')
        },
        openSettings () {
            // location.href = 'https://en.wikipedia.org/wiki/Body_mass_index'
          this.settings = false
          this.$router.push('/settings')
        },
        home () {
            if (this.$route.path === '/') return
            this.$router.push('/')
        },
        async makePurchase(service) {
            const paymentMethods = [{
                supportedMethods: "https://play.google.com/billing",
                data: {
                    sku: 'support',
                }
            }]
            const paymentDetails = {
                total: {
                    label: `Total`,
                    amount: {currency: `USD`, value: `5`}
                }
            }
            const request = new PaymentRequest(paymentMethods, paymentDetails);
            try {
                const paymentResponse = await request.show();
                const {purchaseToken} = paymentResponse.details;
                await service.acknowledge(purchaseToken, 'repeatable');
            } catch(e) {
                alert('Something went wrong. Please try again.')
            }
        }
    }
}
</script>
