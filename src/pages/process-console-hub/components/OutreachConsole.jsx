import React, { useState } from 'react';
        import RunnerButton from './RunnerButton';
        import ProcessCard from './ProcessCard';
        import ControlPanel from './ControlPanel';

        const OutreachConsole = () => {
          const [activeCampaigns, setActiveCampaigns] = useState([
            {
              id: 'outreach-001',
              name: 'Q4 Lead Generation Campaign',
              status: 'running',
              progress: 23,
              target: 'enterprise-leads.csv',
              itemsProcessed: 156,
              startTime: '09:15:33',
              runner: 'Instantly'
            },
            {
              id: 'outreach-002',
              name: 'Follow-up Sequence',
              status: 'paused',
              progress: 78,
              target: 'follow-up-list.csv',
              itemsProcessed: 423,
              startTime: '08:42:11',
              runner: 'HeyReach'
            }
          ]);

          const [config, setConfig] = useState({
            campaignType: 'cold-email',
            dailyLimit: 50,
            personalization: true,
            trackOpens: true
          });

          const handleStartCampaign = (campaignConfig) => {
            const newCampaign = {
              id: `outreach-${Date.now()}`,
              name: campaignConfig?.name || 'New Outreach Campaign',
              status: 'running',
              progress: 0,
              target: campaignConfig?.target || 'contact-list.csv',
              itemsProcessed: 0,
              startTime: new Date()?.toLocaleTimeString(),
              runner: campaignConfig?.runner || 'Instantly'
            };
            
            setActiveCampaigns(prev => [...prev, newCampaign]);
            
            // Simulate slower progress for outreach
            const progressInterval = setInterval(() => {
              setActiveCampaigns(prevCampaigns => 
                prevCampaigns?.map(campaign => 
                  campaign?.id === newCampaign?.id 
                    ? { 
                        ...campaign, 
                        progress: Math.min(100, campaign?.progress + Math.random() * 3),
                        itemsProcessed: campaign?.itemsProcessed + Math.floor(Math.random() * 5)
                      }
                    : campaign
                )
              );
            }, 5000);

            setTimeout(() => {
              clearInterval(progressInterval);
              setActiveCampaigns(prevCampaigns => 
                prevCampaigns?.map(campaign => 
                  campaign?.id === newCampaign?.id ? { ...campaign, status: 'completed', progress: 100 } : campaign
                )
              );
            }, 60000);
          };

          return (
            <div className="space-y-6">
              {/* Control Panel */}
              <ControlPanel
                title="Outreach Configuration"
                config={config}
                setConfig={setConfig}
                onStartJob={handleStartCampaign}
                type="outreach"
              />

              {/* Outreach Tools */}
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                  OUTREACH PLATFORMS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <RunnerButton
                    title="Instantly"
                    description="Cold email automation"
                    status="active"
                    onClick={() => handleStartCampaign({ name: 'Cold Email Campaign', runner: 'Instantly', target: 'prospects.csv' })}
                  />
                  <RunnerButton
                    title="HeyReach"
                    description="Multi-channel outreach"
                    status="active"
                    onClick={() => handleStartCampaign({ name: 'Multi-channel Campaign', runner: 'HeyReach', target: 'contacts.csv' })}
                  />
                  <RunnerButton
                    title="LinkedIn Outreach"
                    description="Professional networking"
                    status="idle"
                    onClick={() => handleStartCampaign({ name: 'LinkedIn Campaign', runner: 'LinkedIn', target: 'linkedin-prospects.csv' })}
                  />
                  <RunnerButton
                    title="SMS Campaign"
                    description="Text message outreach"
                    status="warning"
                    onClick={() => alert('SMS campaigns require phone verification')}
                  />
                </div>
              </div>

              {/* Active Campaigns */}
              <div className="bg-card/50 border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-4 font-terminal">
                  ACTIVE CAMPAIGNS
                </h3>
                <div className="space-y-4">
                  {activeCampaigns?.map((campaign) => (
                    <ProcessCard
                      key={campaign?.id}
                      process={campaign}
                      type="outreach"
                    />
                  ))}
                  {activeCampaigns?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground font-terminal">
                      No active outreach campaigns
                    </div>
                  )}
                </div>
              </div>

              {/* Campaign Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card/30 border border-primary/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Open Rate</div>
                  <div className="text-2xl font-bold text-primary font-terminal">24.8%</div>
                </div>
                <div className="bg-card/30 border border-success/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Response Rate</div>
                  <div className="text-2xl font-bold text-success font-terminal">3.2%</div>
                </div>
                <div className="bg-card/30 border border-accent/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Meetings Booked</div>
                  <div className="text-2xl font-bold text-accent font-terminal">12</div>
                </div>
                <div className="bg-card/30 border border-warning/20 rounded p-4">
                  <div className="text-sm text-muted-foreground font-terminal mb-1">Bounce Rate</div>
                  <div className="text-2xl font-bold text-warning font-terminal">2.1%</div>
                </div>
              </div>
            </div>
          );
        };

        export default OutreachConsole;