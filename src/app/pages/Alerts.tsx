import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import {
  Bell, Mail, Smartphone, MessageSquare, AlertTriangle, Droplets,
  Bug, Wind, Clock, Save, RotateCcw, CheckCircle2, Plus, Trash2,
} from 'lucide-react';
import { useApp, generateId } from '../store/AppContext';
import { toast } from 'sonner';

export default function Alerts() {
  const { state, dispatch } = useApp();

  // Map flat store settings to local state
  const [emailEnabled, setEmailEnabled] = useState(state.alertSettings.emailEnabled);
  const [smsEnabled, setSmsEnabled] = useState(state.alertSettings.smsEnabled);
  const [email, setEmail] = useState(state.alertSettings.email);
  const [phone, setPhone] = useState(state.alertSettings.phone);
  const [overdueEnabled, setOverdueEnabled] = useState(state.alertSettings.overdueEnabled);
  const [overdueThreshold, setOverdueThreshold] = useState(state.alertSettings.overdueThreshold);
  const [blockedEnabled, setBlockedEnabled] = useState(state.alertSettings.blockedEnabled);
  const [freshnessEnabled, setFreshnessEnabled] = useState(state.alertSettings.freshnessEnabled);
  const [freshnessThreshold, setFreshnessThreshold] = useState(state.alertSettings.freshnessThreshold);
  const [quietStart, setQuietStart] = useState(state.alertSettings.quietStart);
  const [quietEnd, setQuietEnd] = useState(state.alertSettings.quietEnd);
  const [fieldOverrides, setFieldOverrides] = useState(state.alertSettings.fieldOverrides);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => { setHasChanges(true); }, [
    emailEnabled, smsEnabled, email, phone, overdueEnabled, overdueThreshold,
    blockedEnabled, freshnessEnabled, freshnessThreshold, quietStart, quietEnd, fieldOverrides,
  ]);

  const handleSave = () => {
    dispatch({
      type: 'ALERT_SETTINGS_UPDATE',
      payload: {
        emailEnabled, smsEnabled, email, phone, overdueEnabled, overdueThreshold,
        blockedEnabled, freshnessEnabled, freshnessThreshold, quietStart, quietEnd, fieldOverrides,
      },
    });
    setHasChanges(false);
    toast.success('Alert settings saved');
  };

  const handleReset = () => {
    dispatch({ type: 'ALERT_SETTINGS_RESET' });
    // Reset local state to defaults
    setEmailEnabled(true); setSmsEnabled(false); setEmail('manager@aggiedemo.farm');
    setPhone(''); setOverdueEnabled(true); setOverdueThreshold('1');
    setBlockedEnabled(true); setFreshnessEnabled(true); setFreshnessThreshold('3');
    setQuietStart('22:00'); setQuietEnd('07:00');
    setFieldOverrides([
      { fieldId: 'field-d', fieldName: 'Field D - Alfalfa', rule: 'Alert on any task overdue' },
      { fieldId: 'field-e', fieldName: 'Field E - Orchards', rule: 'Alert on weather blocks only' },
    ]);
    setHasChanges(false);
    toast.success('Alert settings reset to defaults');
  };

  const removeOverride = (fieldId: string) => {
    setFieldOverrides(prev => prev.filter(o => o.fieldId !== fieldId));
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-30 bg-white border-b border-neutral-200 px-4 lg:px-8 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
            <p className="text-sm text-neutral-600 mt-1">Configure how and when you receive alerts</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 space-y-6">
        {/* Channels */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center"><Mail className="h-5 w-5 text-purple-600" /></div>
                <div>
                  <Label className="font-medium">Email notifications</Label>
                  <p className="text-sm text-neutral-500">Receive alerts via email</p>
                </div>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
            </div>
            {emailEnabled && (
              <div className="pl-14">
                <Label className="text-xs text-neutral-500">Email address</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} className="max-w-sm" />
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center"><Smartphone className="h-5 w-5 text-green-600" /></div>
                <div>
                  <Label className="font-medium">SMS notifications</Label>
                  <p className="text-sm text-neutral-500">Text messages for critical alerts</p>
                </div>
              </div>
              <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
            </div>
            {smsEnabled && (
              <div className="pl-14">
                <Label className="text-xs text-neutral-500">Phone number</Label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="max-w-sm" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alert Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Rules</CardTitle>
            <CardDescription>Define what triggers notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <Label className="font-medium">Overdue task alerts</Label>
                  <p className="text-sm text-neutral-500">Get notified when tasks pass their due date</p>
                </div>
              </div>
              <Switch checked={overdueEnabled} onCheckedChange={setOverdueEnabled} />
            </div>
            {overdueEnabled && (
              <div className="pl-8 flex items-center gap-2">
                <Label className="text-sm text-neutral-600">Alert after</Label>
                <Input type="number" value={overdueThreshold} onChange={e => setOverdueThreshold(e.target.value)} className="w-20" min="1" />
                <Label className="text-sm text-neutral-600">day(s) overdue</Label>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wind className="h-5 w-5 text-orange-600" />
                <div>
                  <Label className="font-medium">Blocked task alerts</Label>
                  <p className="text-sm text-neutral-500">Get notified when tasks are blocked</p>
                </div>
              </div>
              <Switch checked={blockedEnabled} onCheckedChange={setBlockedEnabled} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <Label className="font-medium">Data freshness alerts</Label>
                  <p className="text-sm text-neutral-500">Alert when no import received within threshold</p>
                </div>
              </div>
              <Switch checked={freshnessEnabled} onCheckedChange={setFreshnessEnabled} />
            </div>
            {freshnessEnabled && (
              <div className="pl-8 flex items-center gap-2">
                <Label className="text-sm text-neutral-600">Alert after</Label>
                <Input type="number" value={freshnessThreshold} onChange={e => setFreshnessThreshold(e.target.value)} className="w-20" min="1" />
                <Label className="text-sm text-neutral-600">day(s) without import</Label>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
            <CardDescription>Pause non-critical notifications during off hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <Label className="text-xs text-neutral-500">From</Label>
                <Input type="time" value={quietStart} onChange={e => setQuietStart(e.target.value)} className="w-32" />
              </div>
              <span className="text-neutral-400 mt-5">to</span>
              <div>
                <Label className="text-xs text-neutral-500">Until</Label>
                <Input type="time" value={quietEnd} onChange={e => setQuietEnd(e.target.value)} className="w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Field Overrides */}
        <Card>
          <CardHeader>
            <CardTitle>Field-Specific Rules</CardTitle>
            <CardDescription>Custom alert rules for individual fields</CardDescription>
          </CardHeader>
          <CardContent>
            {fieldOverrides.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-4">No field-specific rules configured</p>
            ) : (
              <div className="space-y-3">
                {fieldOverrides.map(o => (
                  <div key={o.fieldId} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{o.fieldName}</p>
                      <p className="text-xs text-neutral-500">{o.rule}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-red-600" onClick={() => removeOverride(o.fieldId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
